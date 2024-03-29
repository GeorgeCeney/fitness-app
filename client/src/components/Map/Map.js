import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const [route, setRoute] = useState([]);

  const platform = new H.service.Platform({
    'apikey': 'da2TME2OhQPR19NeeogV8SmFqXsGDK6SXPuUEbt93hs'
  });

  

  useEffect(() => {
    if (!map.current) {
      const defaultLayers = platform.createDefaultLayers();
      map.current = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 51.063202, lng: -1.308000 },
          zoom: 14,
        }
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current));

      map.current.addEventListener('tap', function (evt) {
        var coord = map.current.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        setRoute(prevRoute => [...prevRoute, { lat: coord.lat, lng: coord.lng }]);
      });
    }
  }, []);

  useEffect(() => {
    if (map.current && route.length > 1) {
      const routingService = platform.getRoutingService(null, 8);
      const routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'car',
        origin: `${route[0].lat},${route[0].lng}`,
        destination: `${route[1].lat},${route[1].lng}`,
        return: 'polyline'
      };

      routingService.calculateRoute(routeRequestParams,
        (result) => {
          if (result.routes.length) {
            result.routes[0].sections.forEach((section) => {
              let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
              let polyline = new H.map.Polyline(linestring, { style: { lineWidth: 4 } });
              map.current.addObject(polyline);
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [route]);

  return (
    <div style={{ width: "100%", height: "500px" }} ref={mapRef} />
  );
};

export default Map;
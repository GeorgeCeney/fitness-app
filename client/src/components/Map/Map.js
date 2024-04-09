import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  
  var route = []
  var clickPoints = []
  
  const platform = new H.service.Platform({
    'apikey': 'da2TME2OhQPR19NeeogV8SmFqXsGDK6SXPuUEbt93hs'
  });

  console.log(props.startingPoint)

  useEffect(() => {
    const clearButton = document.getElementById("TESTER")

    if (!map.current) {
      const defaultLayers = platform.createDefaultLayers();
      
      map.current = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 51.063202, lng: -1.308000 },
          zoom: 16,
        }
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current));

      var ui = H.ui.UI.createDefault(map.current, defaultLayers, 'en-US');
      
      // CLEAR BUTTON PRESSED
      clearButton.addEventListener("click", function (evt) {
        console.log("HELLO")
        route = []
        console.log(clickPoints)
  
        while(clickPoints.length > 0) { map.current.removeObject(clickPoints[0]); clickPoints.shift()}
      })

      // MOUSE CLICK ON MAP
      map.current.addEventListener('tap', function (evt) {
        // gets coords of mouse click
        var coord = map.current.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        route.push(coord) 
        
        // adds circle on coords
        var clickPoint = new H.map.Circle(
          new H.geo.Point(coord.lat, coord.lng),
          10,
          {
            style: {
              strokeColor: 'rgba(0, 0, 0, 1)',
              lineWidth: 2,
              fillColor: ((route.length > 1) ? 'rgba(47, 149, 208, 1)' : 'rgba(61, 199, 2, 1)')
            }
          }
        );
        clickPoints.push(clickPoint)
        map.current.addObject(clickPoint);

        // once there are more than two points, connect the route
        if (map.current && route.length > 1) {
          const routingService = platform.getRoutingService(null, 8),
            routeRequestParams = {
              routingMode: 'fast',
              transportMode: 'pedestrian',
              origin: `${route[(route.length-2)].lat},${route[(route.length-2)].lng}`,
              destination: `${route[(route.length-1)].lat},${route[(route.length-1)].lng}`,
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

      });
      
    }
  }, []);

  window.addEventListener('resize', () => map.current.getViewPort().resize());


  // useEffect(() => {
  //   console.log(route)
  //   if (map.current && route.length > 1) {
  //     console.log(route[route])
  //     const routingService = platform.getRoutingService(null, 8),
  //       routeRequestParams = {
  //         routingMode: 'fast',
  //         transportMode: 'pedestrian',
  //         origin: `${route[(route-2)].lat},${route[(route-2)].lng}`,
  //         destination: `${route[(route-1)].lat},${route[(route-2)].lng}`,
  //         return: 'polyline'
  //       };

  //     routingService.calculateRoute(routeRequestParams,
  //       (result) => {
  //         if (result.routes.length) {
  //           result.routes[0].sections.forEach((section) => {
  //             let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
  //             let polyline = new H.map.Polyline(linestring, { style: { lineWidth: 4 } });
  //             map.current.addObject(polyline);
  //           });
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }, [route]);

  return (
    <div style={{ width: "100%", height: "500px" }} ref={mapRef} />
  );
};

export default Map;
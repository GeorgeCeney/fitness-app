import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';
import { useNavigate } from "react-router-dom";

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  
  var route = []
  var clickPoints = []
  var polylines = []
  var distances = []
  var routeDistance = 0
  
  const navigate = useNavigate();
  
  const platform = new H.service.Platform({
    'apikey': 'da2TME2OhQPR19NeeogV8SmFqXsGDK6SXPuUEbt93hs'
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function calcTotalDistance(distanceList) {
    var routeDistanceDiv = document.getElementById("RouteDistanceDiv")

    let sum = 0;
    for (let i = 0; i < distanceList.length; i++ ) {
      sum += distanceList[i];
    }

    routeDistanceDiv.innerHTML = sum + "m";

    if (sum >= 1000) {
      routeDistanceDiv.innerHTML = (sum / 1000).toFixed(2) + "km";
    } else {
      routeDistanceDiv.innerHTML = sum + "m";
    }
    return (sum)
  }

  function findMinMaxCoordinates(xCoordinates, yCoordinates) {
    // Initialize variables to store min and max values
    let minX = xCoordinates[0];
    let maxX = xCoordinates[0];
    let minY = yCoordinates[0];
    let maxY = yCoordinates[0];

    // Iterate over the coordinates
    for (let i = 1; i < xCoordinates.length; i++) {
        // Update minX and maxX
        if (xCoordinates[i] < minX) {
            minX = xCoordinates[i];
        } else if (xCoordinates[i] > maxX) {
            maxX = xCoordinates[i];
        }

        // Update minY and maxY
        if (yCoordinates[i] < minY) {
            minY = yCoordinates[i];
        } else if (yCoordinates[i] > maxY) {
            maxY = yCoordinates[i];
        }
    }

    // Return min and max coordinates
    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };
}

  function setMapViewBounds(map, bounds) {
    var bbox = new H.geo.Rect(bounds.maxY, bounds.minX, bounds.minY, bounds.maxX);
    map.getViewModel().setLookAtData({bounds: bbox, zoom:16}, true);
  }

  async function capture(map, ui) {
    let sumLat = 0;
    let sumLng = 0;
    let varianceListLat = []
    let varianceListLng = []

    route.forEach((point) => {
      sumLat += point.lat
      varianceListLat.push(point.lat)
      sumLng += point.lng
      varianceListLng.push(point.lng)
    })

    const routeBounds = findMinMaxCoordinates(varianceListLng, varianceListLat)
    setMapViewBounds(map, routeBounds)

    await sleep(2000)

    map.capture(function(canvas) {
      if (canvas) {
        let routeImage = canvas.toDataURL("image/png")
        navigate('/routes/save-route', { state: { routeImage, routeDistance, route} })
      } else {
        console.log('Capturing is not supported')
      }
    }, [ui]);
  }

  useEffect(() => {
    const clearButton = document.getElementById("ClearRouteButton")
    const undoButton = document.getElementById("UndoRouteButton")
    const saveRun = document.getElementById("SaveRun")
    document.getElementById("SaveRouteWarning").style.display = "none";

    // CREATES MAP
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
      


      // CLEAR ROUTE
      clearButton.addEventListener("click", function (evt) {
        route = []
        distances = []
        routeDistance = calcTotalDistance(distances)
        while(clickPoints.length > 0) { map.current.removeObject(clickPoints[0]); clickPoints.shift()}
        while(polylines.length > 0) { map.current.removeObject(polylines[0]); polylines.shift()}
      })




      // UNDO LAST POINT
      undoButton.addEventListener("click", function (evt) {
        distances.pop()
        routeDistance = calcTotalDistance(distances)
        if (clickPoints.length > 0) {
          map.current.removeObject(clickPoints[clickPoints.length - 1])
          clickPoints.pop()
        }
        if (polylines.length > 0) {
          map.current.removeObject(polylines[polylines.length - 1])
          polylines.pop()
        }
        route.pop()
      })


      // SAVE RUN CLICK
      saveRun.addEventListener("click", function (evt) {
        if (route.length > 1) {
          document.getElementById("SaveRouteWarning").style.display = "none";
          capture(map.current, ui);
        } else {
          document.getElementById("SaveRouteWarning").style.display = "block";
        }
      })

      
      // MOUSE CLICK ON MAP
      map.current.addEventListener('tap', function (evt) {
        document.getElementById("SaveRouteWarning").style.display = "none";
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
          const pointToPoint = platform.getRoutingService(null, 8),
            pointToPointRequestParams = {
              routingMode: 'fast',
              transportMode: 'pedestrian',
              origin: `${route[(route.length-2)].lat},${route[(route.length-2)].lng}`,
              destination: `${route[(route.length-1)].lat},${route[(route.length-1)].lng}`,
              return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
            };
    
          pointToPoint.calculateRoute(pointToPointRequestParams,
            (result) => {
              if (result.routes.length) {
                distances.push(result.routes[0].sections[0].travelSummary.length)
                routeDistance = calcTotalDistance(distances)

                result.routes[0].sections.forEach((section) => {
                  let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                  let polyline = new H.map.Polyline(linestring, { style: { lineWidth: 4 } });
                  map.current.addObject(polyline);
                  polylines.push(polyline)
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

  return (
    <div style={{ width: "100%", height: "500px" }} ref={mapRef} />
  );
};

export default Map;
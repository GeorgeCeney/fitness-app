import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  
  var route = []
  var clickPoints = []
  var polylines = []
  var distances = []
  var routeDistance = 0
  
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

  async function capture(resultContainer, map, ui) {
    console.log(route)
    let sumLat = 0;
    let sumLng = 0;
    route.forEach((point) => {
      sumLat += point.lat
      sumLng += point.lng
    })

    map.setCenter({lat: (sumLat/route.length), lng: (sumLng/route.length)})
    map.setZoom(15); // needs method

    await sleep(3000)

    map.capture(function(canvas) {
      if (canvas) {
        resultContainer.innerHTML = '';
        resultContainer.appendChild(canvas);
      } else {
        // For example when map is in Panorama mode
        resultContainer.innerHTML = 'Capturing is not supported';
      }
    }, [ui], 0, 0, 500, 500);
  }

  useEffect(() => {
    const clearButton = document.getElementById("ClearRouteButton")
    const undoButton = document.getElementById("UndoRouteButton")
    const saveRun = document.getElementById("SaveRun")

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

      saveRun.addEventListener("click", function (evt) {
        var resultContainer = document.getElementById('panel2');
        capture(resultContainer, map.current, ui);


        // REFERENCE: https://downhilltodowntown.com/how-to-calculate-your-caloric-burn-while-running/
        
      //   var MET = 0 // Metabolic Equivalent of Task (MET) is a unit used to estimate the energy expenditure of various activities
      //   let weight = document.getElementById("weightInput").value
      //   let time = document.getElementById("timeInput").value

      //   let avgKmPerHour = (routeDistance / 1000) / (time / 60)

      //   const speedRanges = [4.0, 5.7, 8.0, 9.7, 11.3, 12.9, 14.5];
      //   const mets = [0.5, 2, 4, 6, 8, 10, 11.5, 12.8];
        
      //   for (let i = 0; i < speedRanges.length; i++) {
      //       if (avgKmPerHour < speedRanges[i]) {
      //           MET = mets[i];
      //           break;
      //       }
      //   }
      //   if (MET === undefined) {
      //       MET = mets[mets.length - 1];
      //   }

      //   // If avgKmPerHour is greater than or equal to the last speed range
      //   var estCaloriesBurntDiv = document.getElementById("estCaloriesBurntDiv")
        
      //   // Calories Burned = MET x Body Weight (kg) x Duration of Running (hours)
      //   let estCaloriesBurnt = MET * weight * (time / 60)
      //   estCaloriesBurntDiv.innerHTML = routeDistance > 0 ? estCaloriesBurnt : 0
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
        // clickPoint.addEventListener('tap', console.log("tap detected"));

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
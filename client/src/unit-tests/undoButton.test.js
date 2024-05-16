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

describe('Undo button event listener', () => {
    // Mock elements and functions
    let undoButton;
    let route, distances, routeDistance, clickPoints, polylines;
  
    beforeEach(() => {
      // Set up document body
      document.body.innerHTML = '<div id="RouteDistanceDiv"></div> <button id="undoButton"></button>';
      undoButton = document.getElementById('undoButton');
  
      route = [{lat: 50, lng: 50}, {lat: 51, lng: 51}, {lat: 52, lng: 52}];
      distances = [600, 800];
      clickPoints = [{qa: 6, node: 0}, {qa: 6, node: 1}, {qa: 6, node: 2}]; // Mock clickPoints objects
      polylines = [{qa: 5, line: 0}, {qa: 5, line: 1}]; // Mock polyline objects
  
      // Adding the event listener to the undo button
      undoButton.addEventListener("click", function (evt) {
        distances.pop();
        routeDistance = calcTotalDistance(distances);
        if (clickPoints.length > 0) {
          clickPoints.pop();
        }
        if (polylines.length > 0) {
          polylines.pop();
        }
        route.pop();
      });
    });

  
    test('correctly undoes last actions on arrays', () => {
      // Trigger the click event
      undoButton.click();
  
      // Test if last elements are removed
      expect(distances).toEqual([600]);
      expect(route).toEqual([{lat: 50, lng: 50}, {lat: 51, lng: 51}]);
      expect(clickPoints).toEqual([{qa: 6, node: 0}, {qa: 6, node: 1}]);
      expect(polylines).toEqual([{qa: 5, line: 0}]);
    });
  
    test('handles empty arrays without errors', () => {
      // Empty all arrays
      route = [];
      distances = [];
      clickPoints = [];
      polylines = [];
  
      // Attempt to trigger the click event
      expect(() => undoButton.click()).not.toThrow();
      expect(route).toEqual([]);
      expect(distances).toEqual([]);
      expect(clickPoints).toEqual([]);
      expect(polylines).toEqual([]);
    });

    test('updates RouteDistanceDiv correctly', () => {
        const routeDistanceDiv = document.getElementById('RouteDistanceDiv');
        undoButton.click();
        expect(routeDistanceDiv.innerHTML).toBe("600m");
      });
  });
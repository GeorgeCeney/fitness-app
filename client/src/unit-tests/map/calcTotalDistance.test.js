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

describe('calcTotalDistance function', () => {
    // Setup a mock for the DOM element
    beforeEach(() => {
      document.body.innerHTML = '<div id="RouteDistanceDiv"></div>';
    });
  
    test('updates RouteDistanceDiv correctly for sum less than 1000 meters', () => {
      const distances = [200, 300, 400]; // Total: 900 meters
      const expectedResult = '900m';
      calcTotalDistance(distances);
      const routeDistanceDiv = document.getElementById('RouteDistanceDiv');
      expect(routeDistanceDiv.innerHTML).toBe(expectedResult);
    });
  
    test('updates RouteDistanceDiv correctly for sum equal to or more than 1000 meters', () => {
      const distances = [500, 600, 900]; // Total: 2000 meters
      const expectedResult = '2.00km'; // Converted to kilometers
      calcTotalDistance(distances);
      const routeDistanceDiv = document.getElementById('RouteDistanceDiv');
      expect(routeDistanceDiv.innerHTML).toBe(expectedResult);
    });
  });


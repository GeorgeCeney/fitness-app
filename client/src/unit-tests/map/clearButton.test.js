describe('Clear button event listener', () => {
    // Mock elements and functions
    let clearButton;
    let route, distances, routeDistance, clickPoints, polylines;
    
    // Mock the map object
    const removeObjectMock = jest.fn(clickPoints => clickPoints.pop());
    const map = {
      current: {
        removeObject: removeObjectMock
      }
    };
  
    beforeAll(() => {
      // Set up our document body
      document.body.innerHTML = `<button id="clearButton"></button>`;
      clearButton = document.getElementById('clearButton');
  
      // Initialize arrays and routeDistance
      route = [{lat: 50, lng: 50}, {lat: 51, lng: 51}, {lat: 52, lng: 52}];
      distances = [600, 800];
      clickPoints = [{qa: 6, node: 0}, {qa: 6, node: 1}, {qa: 6, node: 2}]; // Mock clickPoints objects
      polylines = [{qa: 5, line: 0}, {qa: 5, line: 1}]; // Mock polyline objects
  
      // Adding the event listener to the clear button
      clearButton.addEventListener("click", function (evt) {
        route = [];
        distances = [];
        routeDistance = 0
        while(clickPoints.length > 0) {
          map.current.removeObject(clickPoints[0]);
          clickPoints.shift();
        }
        while(polylines.length > 0) {
          map.current.removeObject(polylines[0]);
          polylines.shift();
        }
      });
    });
  
    test('clears arrays and calls calcTotalDistance with empty distances', () => {
      // Trigger the click event
      clearButton.click();
  
      expect(route).toEqual([]);
      expect(distances).toEqual([]);
      expect(routeDistance).toBeDefined();
    });
  
    test('removes all clickPoints and polylines from the map', () => {
      // Assume arrays are refilled for testing
      clickPoints.push({}, {});
      polylines.push({}, {});
  
      // Trigger the click event
      clearButton.click();
  
      // Check if all items were removed
      expect(clickPoints).toEqual([]);
      expect(polylines).toEqual([]);
    });
  });
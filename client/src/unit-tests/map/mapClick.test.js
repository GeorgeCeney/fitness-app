describe('map tap event listener', () => {
    // Mock elements and functions
    let route;

    const map = {
        listeners: {},
        addEventListener: function(eventType, handler) {
            // Ensure there's an array to hold the handlers for this event type
            if (!this.listeners[eventType]) {
                this.listeners[eventType] = [];
            }
            this.listeners[eventType].push(handler);
        },
        click: function(event) {
            // Trigger all handlers for the 'click' event with the provided event object
            if (this.listeners['click']) {
                this.listeners['click'].forEach(handler => handler(event));
            }
        }
    };

    const firstMockCoord = {
        currentPointer: {
          viewportX: 50.123,
          viewportY: 8.456
        }
    };
    
    const secondMockCoord = {
        currentPointer: {
          viewportX: 51.321,
          viewportY: 9.789
        }
    };

  
    beforeAll(() => {
      // Mock the map and platform objects
    //   document.body.innerHTML = '<div id="Map"></div>';
    //   map = document.getElementById('Map');
  
      route = [];
  
      // Mock the tap event logic
      map.addEventListener('click', function (evt) {
        const coord = {x: evt.currentPointer.viewportX, y: evt.currentPointer.viewportY};
        route.push(coord);
        });
    });
  
    test('adds first coordinates to route on map click', () => {
        map.click(firstMockCoord)
        expect(route).toEqual([{x: firstMockCoord.currentPointer.viewportX, y: firstMockCoord.currentPointer.viewportY}]);
    });

    test('adds second coordinates to route on map click', () => {
        map.click(secondMockCoord)
        expect(route).toEqual([{x: firstMockCoord.currentPointer.viewportX, y: firstMockCoord.currentPointer.viewportY}, {x: secondMockCoord.currentPointer.viewportX, y: secondMockCoord.currentPointer.viewportY}]);
      });
  });
  
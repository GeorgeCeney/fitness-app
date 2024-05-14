describe('SaveRun button event listener', () => {
    // Mock elements and functions
    let saveRunButton;
    let route;
    const mockCapture = jest.fn();
  
    // Setup DOM environment
    document.body.innerHTML = `
      <button id="saveRun"></button>
      <div id="SaveRouteWarning"></div>
    `;
  
    // References to DOM elements
    const saveRouteWarning = document.getElementById("SaveRouteWarning");
  
    // Mock for map.current and ui
    const map = { current: {} };
    const ui = {};
  
    beforeAll(() => {
      saveRunButton = document.getElementById('saveRun');
      saveRunButton.addEventListener("click", function (evt) {
        if (route.length > 1) {
          saveRouteWarning.style.display = "none";
          mockCapture(map.current, ui);
        } else {
          saveRouteWarning.style.display = "block";
        }
      });
  
      // Initialize the route array
      route = [];
    });
  
    beforeEach(() => {
      // Clear all mocks and reset route array for each test
      mockCapture.mockClear();
      route.length = 0; // Reset the array without changing the reference
      saveRouteWarning.style.display = "none"; // Reset display style
    });
  
    test('displays warning and does not call capture when route length is <= 1', () => {
      route.push(1); // Route length is 1
  
      saveRunButton.click();
  
      expect(saveRouteWarning.style.display).toBe("block");
      expect(mockCapture).not.toHaveBeenCalled();
    });
  
    test('hides warning and calls capture when route length is > 1', () => {
      route.push(1, 2); // Route length is 2
  
      saveRunButton.click();
  
      expect(saveRouteWarning.style.display).toBe("none");
      expect(mockCapture).toHaveBeenCalledTimes(1);
      expect(mockCapture).toHaveBeenCalledWith(map.current, ui);
    });
  });
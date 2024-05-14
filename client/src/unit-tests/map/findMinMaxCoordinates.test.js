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
};

describe('findMinMaxCoordinates function', () => {
    test('finds correct min and max coordinates for non-uniform lists', () => {
      const xCoordinates = [10, 20, 15, 5, 25];
      const yCoordinates = [1, 2, 3, 4, 0];
      const expected = {
        minX: 5,
        maxX: 25,
        minY: 0,
        maxY: 4
      };
      const result = findMinMaxCoordinates(xCoordinates, yCoordinates);
      expect(result).toEqual(expected);
    });
  
    test('handles arrays where all elements are the same', () => {
      const xCoordinates = [7, 7, 7, 7, 7];
      const yCoordinates = [3, 3, 3, 3, 3];
      const expected = {
        minX: 7,
        maxX: 7,
        minY: 3,
        maxY: 3
      };
      const result = findMinMaxCoordinates(xCoordinates, yCoordinates);
      expect(result).toEqual(expected);
    });
  
    test('works correctly with single element arrays', () => {
      const xCoordinates = [15];
      const yCoordinates = [22];
      const expected = {
        minX: 15,
        maxX: 15,
        minY: 22,
        maxY: 22
      };
      const result = findMinMaxCoordinates(xCoordinates, yCoordinates);
      expect(result).toEqual(expected);
    });
  
    test('correctly identifies min and max in mixed sign coordinates', () => {
      const xCoordinates = [-10, 20, 0, 5, -25];
      const yCoordinates = [-1, 2, -3, 4, 0];
      const expected = {
        minX: -25,
        maxX: 20,
        minY: -3,
        maxY: 4
      };
      const result = findMinMaxCoordinates(xCoordinates, yCoordinates);
      expect(result).toEqual(expected);
    });
  });

function calcEstimatedCaloriesBurnt(routeDistance, numLaps, runTime, userWeight) {
    var MET // Metabolic Equivalent of Task (MET) is a unit used to estimate the energy expenditure of various activities
    let avgKmPerHour = ((routeDistance * numLaps) / 1000) / (runTime / 60)
    
    const speedRanges = [4.0, 5.7, 8.0, 9.7, 11.3, 12.9, 14.5];
    const mets = [0.5, 2, 4, 6, 8, 10, 11.5, 12.8];
    
    for (let i = 0; i < speedRanges.length; i++) {
        if (avgKmPerHour < speedRanges[i]) {
            MET = mets[i];
            break;
        }
    }
    if (MET === undefined) {
        MET = mets[mets.length - 1];
    }
    
    // Calories Burned = MET x Body Weight (kg) x Duration of Running (hours)
    let estCaloriesBurnt = MET * userWeight * (runTime / 60)
    return (estCaloriesBurnt)
}

describe('calcEstimatedCaloriesBurnt function', () => {
    test.each([
        { routeDistance: 1000, numLaps: 2, runTime: 60, userWeight: 65, expectedCalories: 65 * 0.5 * 1 }, // Speed = 2 km/h, MET = 0.5
        { routeDistance: 5000, numLaps: 1, runTime: 30, userWeight: 70, expectedCalories: 70 * 8 * 0.5 }, // Speed = 10 km/h, MET = 8
        { routeDistance: 2000, numLaps: 3, runTime: 40, userWeight: 75, expectedCalories: 75 * 6 * (40/60) }, // Speed = 15 km/h, MET = 6
        { routeDistance: 7000, numLaps: 1, runTime: 25, userWeight: 80, expectedCalories: 80 * 12.8 * (25/60) }, // Speed = 16.8 km/h, MET = 12.8
    ])('calculates the correct calories burnt for %p', ({ routeDistance, numLaps, runTime, userWeight, expectedCalories }) => {
      const caloriesBurnt = calcEstimatedCaloriesBurnt(routeDistance, numLaps, runTime, userWeight);
      expect(caloriesBurnt).toBeCloseTo(expectedCalories);
    });
});
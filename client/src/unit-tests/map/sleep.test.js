function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('sleep function', () => {
  test('delays for roughly the specified duration', async () => {
    const ms = 1000;  // 1000 milliseconds delay
    const start = Date.now();
    await sleep(ms);
    const end = Date.now();
    const deltaTime = end - start;

    // Expecting the delay to be within a reasonable window around the specified time.
    // Allowing some extra time for promise resolution and timeout setting
    expect(deltaTime).toBeGreaterThanOrEqual(ms);
    expect(deltaTime).toBeLessThan(ms + 100); // Adjust the upper limit based on the accuracy you need
  });
});
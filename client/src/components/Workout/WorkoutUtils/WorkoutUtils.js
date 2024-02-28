export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours} : ${mins}`;
}
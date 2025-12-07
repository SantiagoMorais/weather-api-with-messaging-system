export const calculateStaleTimeUntilNextHour = (): number => {
  const now = new Date();

  const nextHour = new Date(now);

  nextHour.setMinutes(1);
  nextHour.setSeconds(0);
  nextHour.setMilliseconds(0);

  nextHour.setHours(now.getHours() + 1);

  return nextHour.getTime() - now.getTime();
};

export function getDateMonthBefore() {
  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1); // Subtract one month
  const isoDateOneMonthBefore = oneMonthBefore.toISOString();
  return isoDateOneMonthBefore;
}

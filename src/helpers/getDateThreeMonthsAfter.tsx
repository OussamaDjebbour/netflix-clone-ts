export function getDateThreeMonthsAfter() {
  const threeMonthAfter = new Date();
  threeMonthAfter.setMonth(threeMonthAfter.getMonth() + 3); // Add 3 months
  const isoDatethreeMonthAfter = threeMonthAfter.toISOString();
  return isoDatethreeMonthAfter;
}

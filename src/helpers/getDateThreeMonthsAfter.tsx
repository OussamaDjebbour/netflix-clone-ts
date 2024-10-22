export function getDateThreeMonthsAfter() {
  const threeMonthAfter = new Date();
  threeMonthAfter.setMonth(threeMonthAfter.getMonth() + 3); // Subtract one month
  const isoDatethreeMonthAfter = threeMonthAfter.toISOString();
  console.log(
    'isoDatethreeMonthAfterisoDatethreeMonthAfterisoDatethreeMonthAfterisoDatethreeMonthAfter',
    isoDatethreeMonthAfter,
  );
  return isoDatethreeMonthAfter;
}

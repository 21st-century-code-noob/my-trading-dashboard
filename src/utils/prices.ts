export  const getChangePercentString = (changePercent?: number) => {
  if (!changePercent) return "Unknown";
  if (changePercent === 0) return "0.00%"
  if (changePercent > 0) return `+${changePercent}%`;
  return `${changePercent}%`
};
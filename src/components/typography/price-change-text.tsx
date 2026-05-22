type PriceChangeTextProps = {
  priceChange?: number;
  decimals?: number;
}

function getChangeTextClass (priceChange: number | undefined) {
  if (!priceChange || priceChange < 0) {
    return "text-down";
  } else {
    return "text-up";
  }
}

const getChangePercentString = (changePercent?: number, decimals?: number) => {
  if (changePercent === undefined || changePercent === null) return "--";
  if (changePercent === 0) return "0.00%"
  const changePercentFixed = changePercent.toFixed(decimals);
  if (changePercent > 0) return `+${changePercentFixed}%`;
  return `${changePercentFixed}%`
};

function PriceChangeText({ priceChange, decimals = 2}: PriceChangeTextProps) {
  return (
    <span className={`font-mono ${getChangeTextClass(priceChange)}`}>
      {getChangePercentString(priceChange, decimals)}
    </span>
    
  )
}

export default PriceChangeText;

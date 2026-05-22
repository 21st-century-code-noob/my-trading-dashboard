import { useFlashOnChange } from "@/hooks/useFlashOnChange";

type PriceTextProps = {
  price?: number;
  decimals?: number;
}

function PriceText({ price, decimals = 2 }: PriceTextProps) {
  const { flashClass, flashKey } = useFlashOnChange(price);
  const fixedPrice = (price === undefined || price === null) ? "--" : `${price.toFixed(decimals)}`;

  return (
    <span
      key={flashKey}
      className={`font-bold font-mono text-foreground ${flashClass}`}
    >
      {fixedPrice}
    </span>
  );
}

export default PriceText;

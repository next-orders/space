type Props = {
  value: number | null | undefined;
};

export const Price = ({ value }: Props) => {
  if (!value) return "";

  const remainder = value - parseInt(value.toString());
  if (remainder > 0) {
    // Have some digits after dot: return as Decimal
    return value.toFixed(2);
  }

  // As it is: for RUB, currency with an integer
  return value;
};

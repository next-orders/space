type Props = {
  code: "RUB" | "USD" | string | null | undefined;
};

export const CurrencySign = ({ code }: Props) => {
  switch (code) {
    case "RUB":
      return "₽";
    case "USD":
      return "$";
    default:
      return "";
  }
};

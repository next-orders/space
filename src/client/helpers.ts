export const getCurrencySign = (
  code: "RUB" | "USD" | string | null | undefined,
) => {
  switch (code) {
    case "RUB":
      return "₽";
    case "USD":
      return "$";
    default:
      return "";
  }
};

export const CurrencyFormatter = (currency: string = "NGN") =>
  new Intl.NumberFormat("locale", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  });

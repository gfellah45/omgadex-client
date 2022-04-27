export const CurrencyFormatter = new Intl.NumberFormat("locale", {
  style: "currency",
  currency: "NGN",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 2,
});

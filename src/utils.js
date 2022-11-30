export const currencyFormator = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: "0",
})
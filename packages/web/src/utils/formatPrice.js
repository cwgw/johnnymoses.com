const formatPrice = price => {
  if (!price) {
    return null;
  }
  const { amount, currencyCode = "USD" } = price;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export default formatPrice;

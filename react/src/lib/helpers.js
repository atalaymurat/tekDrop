export const localeDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export const formPrice = (number, cur) => {
  let n = Number(number)
  if (cur) {
    return n.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: "currency",
      currency: cur,
    })
  }
  if (!cur) {
    return n.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }
}

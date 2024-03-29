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

export const sideText = (val) => {
  if (val === "TY") {
    return "TEK YÜZ BOYAMA"
  }
  if (val === "CY") {
    return "ÇİFT YÜZ BOYAMA"
  }
  if (val === "TYA") {
    return "ARKA ASTAR BOYALI"
  }
}

export const glossText = (val) => {
  if (Number(val) === 100) {
    return "Parlak"
  }
  if (Number(val) === 40) {
    return "İpek Mat"
  }
  if (Number(val) === 30 ) {
    return "Mat 30"
  }
  if (Number(val) === 20 ) {
    return "Mat"
  }
  if (Number(val) === 10 ) {
    return "Tam Mat"
  }
  if (Number(val) === 5) {
    return "Zero Mat"
  } else {
    return "GLOSS ?"
  }
}

module.exports = {
  trToEn: (text) => {
    return text
      .replace(/\ğ/g, "g")
      .replace(/\ü/g, "u")
      .replace(/\ş/g, "s")
      .replace(/\ı/g, "i")
      .replace(/\ö/g, "o")
      .replace(/\ç/g, "c")
  },
}

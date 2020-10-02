const hexToRgba = (hexInput, opacity) => {
  const base16 = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  }

  let hex = hexInput.split('')
  hex.shift()

  const r = hex
    .splice(0, 2)
    .map((n, index) => (index === 1 ? base16[n.toLowerCase()] : 16 * base16[n.toLowerCase()]))
    .reduce((total, n) => total + n, 0)
  const g = hex
    .splice(0, 2)
    .map((n, index) => (index === 1 ? base16[n.toLowerCase()] : 16 * base16[n.toLowerCase()]))
    .reduce((total, n) => total + n, 0)
  const b = hex
    .splice(0, 2)
    .map((n, index) => (index === 1 ? base16[n.toLowerCase()] : 16 * base16[n.toLowerCase()]))
    .reduce((total, n) => total + n, 0)

  return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`
}

export default hexToRgba
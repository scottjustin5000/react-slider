export  const toPercent = (value, min, max) => ((value - min) * 100) / (max - min)

export const toValue = (percent, min, max) => (max - min) * percent + min

export const toFormatted = (value, percision) => {
  if(!percision) return parseInt(value, 10)
  return value.toPercision(percision)
}
import hexToRgba from './hextorgba'
import luminance  from './luminance'

const convertColor = (hex, lum, opacity) => {
  const darker = luminance(hex, lum * 100)
  return hexToRgba(darker, opacity)
}

export default convertColor
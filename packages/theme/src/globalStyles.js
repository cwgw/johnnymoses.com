import fonts from './fonts'

export default {
  ":root": fonts.map(font => ({ "@font-face": font })),
}

// ----------------------------------------------------------------------

// @ts-ignore
export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

// @ts-ignore
export function pxToRem(value) {
  return `${value / 16}rem`;
}

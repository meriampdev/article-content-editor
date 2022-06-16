
const stylesNames = {
  fontWeight: 'font-weight',
  fontStyle: 'font-style',
  color: 'color',
  textDecoration: 'text-decoration'
}

const styleDefaults = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  color: "#151515",
  textDecoration: 'none'
}

const styleValues = {
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: "#151515",
  textDecoration: 'underline'
}

export const toggleStyle = (key, value) => {
  let newValue = styleValues[key] === value ? styleDefaults[key] : styleValues[key]
  return newValue
}

export const styleToString = (styleObject) => {
  let str = ``
  Object.keys(styleObject).map((key) => {
    str = `${str} ${stylesNames[key]}: ${styleObject[key]};`
  })

  return str
}
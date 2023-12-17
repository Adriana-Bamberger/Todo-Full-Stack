export function examplePattern1(max) {
  let output = ''
  const rows = Array(max).fill(0)

  rows.forEach(() => {
    const cols = Array(max).fill(0)
    output += cols.join(' ') + '\n'
  })

  return output
}

export function examplePattern2(max) {
  let output = ''
  const rows = Array(max).fill(0)

  rows.forEach((item, i) => {
    const cols = Array(i + 1).fill(i + 1)
    output += cols.join(' ') + '\n'
  })

  return output
}

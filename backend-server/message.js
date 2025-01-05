const message = "How do you kill a void"

const split = message.split('')
const bin = split.map((char) => {
    return (char.charCodeAt(0).toString(2).padStart(8, '0'))
})
const ans = bin.join('')

module.exports = ans
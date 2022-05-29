import words from "word-list-json"
const englishWords = words.filter(l => l.length > 3)
export default englishWords

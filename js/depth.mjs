// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// Bonus 2: Depth — optional experiments to reproduce and explain.
const [firstLetter, ...remainingLetters] = 'Çilekeş'
console.log('B2 string:', firstLetter, remainingLetters.join(''))
const [firstUnique, ...remainingUnique] = new Set(['Siyah', 'Uyan', 'Siyah', 'Yine'])
console.log('B2 Set:', firstUnique, JSON.stringify(remainingUnique))
const [[title, rating]] = new Map([['Siyah', 10]])
console.log('B2 Map:', title, rating)
function* playQueue() {
  try {
    console.log('B2 generator: started')
    yield 'Siyah'
    console.log('B2 generator: second requested')
    yield 'Uyan'
  } finally {
    console.log('B2 generator: closed')
  }
}
const [firstSong] = playQueue()
console.log('B2 generator first:', firstSong)
let calls = 0
function defaultVolume() {
  calls += 1
  return 35
}
const [volume = defaultVolume(), quietVolume = volume - 10, note = defaultVolume()] = [undefined, undefined, null]
console.log('B2 defaults:', volume, quietVolume, note, calls)
try {
  const [first = later, later = 'Yine'] = []
  console.log(first, later)
} catch (error) {
  console.log('B2 initialization:', `${error.name}: ${error.message}`)
}
const playback = { current: '', next: '' }
;[playback.current, playback.next] = ['Siyah', 'Uyan']
console.log('B2 assignment targets:', JSON.stringify(playback))

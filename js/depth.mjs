// Arif Mert Şengel — 2024501012
// Bonus 2: Depth — Hardrock experiments.
// D1
{
  const [firstLetter, ...remainingLetters] = 'Çilekeş'
  console.log('D1 string:', firstLetter, remainingLetters.join(''))
  const [firstUnique, ...remainingUnique] = new Set(['Siyah', 'Uyan', 'Siyah', 'Yine'])
  console.log('D1 Set:', firstUnique, JSON.stringify(remainingUnique))
  const [[title, rating]] = new Map([['Siyah', 10]])
  console.log('D1 Map:', title, rating)
}

// D2
{
  function tracedQueue(label) {
    const titles = ['Siyah', 'Uyan', 'Yine']
    return {
      [Symbol.iterator]() {
        let index = 0
        console.log(`${label} iterator`)
        return {
          next() {
            const done = index >= titles.length
            console.log(`${label} next:`, index, done ? 'done' : 'value')
            return { value: titles[index++], done }
          },
          return() {
            console.log(`${label} return`)
            return { done: true }
          },
        }
      },
    }
  }
  const [first] = tracedQueue('D2 one')
  console.log('D2 one result:', first)
  const [, second] = tracedQueue('D2 skip')
  console.log('D2 skip result:', second)
  const [head, ...tail] = tracedQueue('D2 rest')
  console.log('D2 rest result:', head, JSON.stringify(tail))
  const [] = tracedQueue('D2 empty')
  const { 0: numericProperty } = tracedQueue('D2 object')
  console.log('D2 object property:', numericProperty)
}

// D3
{
  function* playQueue(label) {
    try {
      for (const title of ['Siyah', 'Uyan', 'Yine']) {
        console.log(`${label} requested:`, title)
        yield title
      }
    } finally {
      console.log(`${label} closed`)
    }
  }
  const [first] = playQueue('D3 short')
  console.log('D3 short result:', first)
  const [head, ...rest] = playQueue('D3 full')
  console.log('D3 full result:', head, JSON.stringify(rest))
}

// D4
{
  let calls = 0
  function defaultVolume() {
    calls += 1
    return 35
  }
  const [volume = defaultVolume(), quiet = volume - 10,
    note = defaultVolume(), muted = defaultVolume()] = [undefined, undefined, null, 0]
  console.log('D4 defaults:', volume, quiet, note, muted, calls)
  try {
    const [first = later, later = 'Yine'] = []
    console.log(first, later)
  } catch (error) {
    console.log('D4 later binding:', `${error.name}: ${error.message}`)
  }
  const events = []
  const settings = {
    get volume() { events.push('read volume'); return undefined },
    get label() { events.push('read label'); return 'Hardrock' },
  }
  function chooseKey() { events.push('choose key'); return 'volume' }
  function fallback() { events.push('default'); return 35 }
  const { [chooseKey()]: selectedVolume = fallback(), ...rest } = settings
  console.log('D4 evaluation order:', JSON.stringify(events))
  console.log('D4 selected:', selectedVolume, JSON.stringify(rest))
}

// D5
{
  const sourceTag = Symbol('source')
  const song = Object.create({ playlistName: 'Hardrock' })
  song.title = 'Siyah'
  song.rating = 10
  song[sourceTag] = 'student list'
  Object.defineProperty(song, 'internalNote', { value: 'local only', enumerable: false })
  const { playlistName, ...publicTrack } = song
  console.log('D5 inherited lookup:', playlistName)
  console.log('D5 string keys:', JSON.stringify(Object.keys(publicTrack)))
  console.log('D5 symbol keys:', JSON.stringify(Object.getOwnPropertySymbols(publicTrack).map(key => key.description)))
  console.log('D5 hidden copied:', Object.hasOwn(publicTrack, 'internalNote'))
  console.log('D5 JSON:', JSON.stringify(publicTrack))
}

// D6
{
  const ratings = { Siyah: 10, Uyan: 7, Yine: 9 }
  for (const [first, second] in ratings) {
    console.log('D6 for-in:', first, second)
  }
  for (const [title, rating] of Object.entries(ratings)) {
    console.log('D6 for-of:', title, rating)
  }
  const current = { title: '', rating: 0 }
  ;[current.title, current.rating] = ['Siyah', 10]
  console.log('D6 assignment targets:', JSON.stringify(current))
  try {
    throw new Error('No song selected')
  } catch ({ message }) {
    console.log('D6 catch:', message)
  }
}

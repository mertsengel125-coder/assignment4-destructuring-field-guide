// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// PITFALL 1
{
  for (const input of [undefined, null]) {
    try {
      const { title } = input
      console.log(title)
    } catch (error) {
      console.log(`Pitfall 1 ${String(input)}:`, `${error.name}: ${error.message}`)
    }
  }
}

// PITFALL 2
{
  const cases = [
    ['missing', {}],
    ['undefined', { volume: undefined }],
    ['null', { volume: null }],
    ['zero', { volume: 0 }],
  ]
  for (const [label, settings] of cases) {
    const { volume = 35 } = settings
    console.log(`Pitfall 2 ${label}:`, volume)
  }
}

// PITFALL 3
{
  try {
    new Function('let title; { title } = { title: "Siyah" };')()
  } catch (error) {
    console.log('Pitfall 3 invalid:', `${error.name}: ${error.message}`)
  }
  let title
  ;({ title } = { title: 'Siyah' })
  console.log('Pitfall 3 fixed:', title)
}

// PITFALL 4
{
  // This mutation is an experiment, not a change to my recorded song rating.
  const song = { title: 'Siyah', stats: { rating: 10 } }
  const { title, ...copy } = song
  copy.stats.rating = 7
  console.log('Pitfall 4 original rating:', song.stats.rating)
  console.log('Pitfall 4 different outer object:', copy !== song)
  console.log('Pitfall 4 shared stats:', copy.stats === song.stats)
}

// PITFALL 5
{
  const song = { title: 'Siyah', artist: 'Çilekeş' }
  const { artist, title } = song
  const [arrayArtist, arrayTitle] = [song.title, song.artist]
  console.log('Pitfall 5 object:', artist, title)
  console.log('Pitfall 5 array:', arrayArtist, arrayTitle)
}

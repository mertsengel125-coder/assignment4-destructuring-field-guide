// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// FORM 5
{
  const playlist: { name: string; activity: string } = { name: 'Hardrock', activity: 'ders çalışırken' }
  let { name, activity } = playlist
  console.log('F5:', name, activity)
}

// FORM 6
{
  const song: { title: string; artist: string } = { title: 'Siyah', artist: 'Çilekeş' }
  const { title: trackTitle, artist: artistName } = song
  console.log('F6:', trackTitle, artistName)
}

// FORM 7
{
  const playlist: { name: string; note?: string } = { name: 'Hardrock' }
  const { note = 'No playlist note' } = playlist
  console.log('F7:', note)
}

// FORM 8
{
  type Song = { title: string; artist: string; durationSeconds: number; rating: number }
  const song: Song = { title: 'Siyah', artist: 'Çilekeş', durationSeconds: 285, rating: 10 }
  // Select my personal rating separately from the public track information.
  const { rating, ...publicTrack } = song
  console.log('F8 rating:', rating)
  console.log('F8 public:', JSON.stringify(publicTrack))
}

// FORM 9
{
  type Playlist = { listening: { activity: string }; tracks: { title: string }[] }
  const playlist: Playlist = {
    listening: { activity: 'ders çalışırken' },
    tracks: [{ title: 'Siyah' }, { title: 'Uyan' }, { title: 'Yine' }],
  }
  const { listening: { activity }, tracks: [firstTrack] } = playlist
  console.log('F9:', activity, firstTrack?.title)
}

// FORM 10
{
  const song = { title: 'Siyah', durationSeconds: 285, rating: 10 }
  function readSongField(key: keyof typeof song): string | number {
    const { [key]: value } = song
    return value
  }
  console.log('F10 rating:', readSongField('rating'))
  console.log('F10 duration:', readSongField('durationSeconds'))
}

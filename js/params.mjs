// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// FORM 11
{
  // Volume and repeat are simulated settings for this example.
  function playbackOptions({ playlistName = 'Hardrock', volume = 35, repeat = false } = {}) {
    return { playlistName, volume, repeat }
  }
  console.log('F11 omitted:', JSON.stringify(playbackOptions()))
  console.log('F11 supplied:', JSON.stringify(playbackOptions({ volume: 60 })))
  function toSeconds([minutes, seconds]) {
    return minutes * 60 + seconds
  }
  console.log('F11 array parameter:', toSeconds([4, 45]))
}

// FORM 12
{
  const ratings = { Siyah: 10, Uyan: 7, Yine: 9 }
  for (const [title, rating] of Object.entries(ratings)) {
    console.log('F12 object:', title, rating)
  }
  const artists = new Map([['Siyah', 'Çilekeş'], ['Uyan', 'Pickpocket'], ['Yine', 'Kurban']])
  for (const [title, artist] of artists) {
    console.log('F12 Map:', title, artist)
  }
}

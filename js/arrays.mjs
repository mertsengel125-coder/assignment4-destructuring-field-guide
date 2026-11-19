// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// FORM 1
{
  const songs = [
    {
      title: 'Siyah',
      artist: 'Çilekeş',
      durationSeconds: 285,
      rating: 10,
    },
    {
      title: 'Uyan',
      artist: 'Pickpocket',
      durationSeconds: 231,
      rating: 7,
    },
    {
      title: 'Yine',
      artist: 'Kurban',
      durationSeconds: 261,
      rating: 9,
    },
  ]

  function summarizePlaylist(tracks) {
    let totalSeconds = 0
    let totalRating = 0

    for (const track of tracks) {
      totalSeconds += track.durationSeconds
      totalRating += track.rating
    }

    return [totalSeconds, totalRating / tracks.length]
  }

  const [playlistSeconds, averageRating] = summarizePlaylist(songs)

  console.log('F1:', playlistSeconds, averageRating)
}

// FORM 2
{
  const queue = ['Siyah', 'Uyan', 'Yine']
  const [, nextSong, ...remainingSongs] = queue
  console.log('F2 next:', nextSong)
  console.log('F2 remaining:', JSON.stringify(remainingSongs))
}

// FORM 3
{
  let openingSong = 'Siyah'
  let closingSong = 'Yine'
  console.log('F3 before:', openingSong, closingSong)
  ;[openingSong, closingSong] = [closingSong, openingSong]
  console.log('F3 after:', openingSong, closingSong)
}

// FORM 4
{
  // These are simulated saved settings, not claimed listening preferences.
  const savedSettings = []
  const [volume = 35, repeat = false] = savedSettings
  console.log('F4:', volume, repeat)
}

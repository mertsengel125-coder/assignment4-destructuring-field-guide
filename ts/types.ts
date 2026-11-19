// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
// T1
{
  const source = { rating: 10 }
  const { rating: string } = source
  const { rating }: { rating: number } = source
  console.log('T1:', string, typeof string, rating)
}

// T2
{
  function favouriteSong(): [number, string] {
    return [10, 'Siyah']
  }
  const [rating, title] = favouriteSong()
  const fixed = [10, 'Siyah'] as const
  const [fixedRating, fixedTitle] = fixed
  const ten: 10 = fixedRating
  const siyah: 'Siyah' = fixedTitle
  console.log('T2:', rating, title, ten, siyah)
}

// T3
{
  const queue: string[] = []
  const [first] = queue // string | undefined
  const [safeFirst = 'Siyah'] = queue // string
  const message = first === undefined ? 'No song selected' : first.toUpperCase()
  console.log('T3:', first, safeFirst, message)
}

// T4
{
  type Settings = { volume?: number; note?: string | null }
  const settings: Settings = { note: null }
  const { volume: rawVolume } = settings // number | undefined
  const { volume = 35, note = 'No playlist note' } = settings
  const readyVolume: number = volume
  const nullableNote: string | null = note
  console.log('T4:', rawVolume, readyVolume, nullableNote)
}

// T5
{
  const song = { title: 'Siyah' }
  // @ts-expect-error T5: Property 'titel' does not exist; the property is title.
  const { titel } = song
  const { title } = song
  console.log('T5 wrong:', titel)
  console.log('T5 fixed:', title)
}

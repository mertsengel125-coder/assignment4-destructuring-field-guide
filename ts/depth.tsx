// Arif Mert Şengel — 2024501012
// Bonus 2: Depth — Hardrock experiments.
import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// These helpers extract types from tuples, not values from runtime arrays.
type First<T extends readonly unknown[]> =
  T extends readonly [infer Head, ...unknown[]] ? Head : never
type Rest<T extends readonly unknown[]> =
  T extends readonly [unknown, ...infer Tail] ? Tail : []
type ValueOf<T> = T extends { value: infer Value } ? Value : never

const queue = ['Siyah', 'Uyan', 'Yine'] as const
const first: First<typeof queue> = queue[0]
const rest: Rest<typeof queue> = ['Uyan', 'Yine']
console.log('D7 First/Rest:', first, JSON.stringify(rest))

type Song = { title: string; rating: number }
function makeSong(title: string, rating: number): Song {
  return { title, rating }
}
const args: Parameters<typeof makeSong> = ['Siyah', 10]
const { title, rating } = makeSong(...args)
const selectedRating: ValueOf<{ value: number }> = rating
console.log('D7 Parameters/ValueOf:', title, selectedRating)

function SongList<T>({ items, children }: {
  items: readonly T[]
  children: (item: T) => ReactNode
}) {
  return <ul>{items.map(item => children(item))}</ul>
}
const songs: Song[] = [
  { title: 'Siyah', rating: 10 },
  { title: 'Uyan', rating: 7 },
  { title: 'Yine', rating: 9 },
]
console.log('D7 generic component:', renderToStaticMarkup(
  <SongList items={songs}>{song => <li key={song.title}>{song.title}: {song.rating}</li>}</SongList>
))

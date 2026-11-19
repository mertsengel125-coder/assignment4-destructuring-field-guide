# Destructuring Field Guide — Hardrock

Name: Arif Mert Şengel  
Student number: 2024501012

## About this guide

This guide explores JavaScript and TypeScript destructuring through my Hardrock playlist. The examples cover positional values, named properties, defaults, rest, parameter patterns and React props and children. The personal log records my reported predictions, experiments and actual terminal results.

Bonuses claimed: none yet. An optional Bonus 2: Depth study section is included. Claim it only after performing and explaining the experiments. No LaTeX/PDF, real-project study or remote Git history is claimed.

## My data and the example settings

| Title | Artist | Duration I supplied | Seconds | My rating |
| --- | --- | --- | --- | --- |
| Siyah | Çilekeş | 4:45 | 285 | 10/10 |
| Uyan | Pickpocket | 3:51 | 231 | 7/10 |
| Yine | Kurban | 4:21 | 261 | 9/10 |

Playlist: Hardrock. Listening context: ders çalışırken (while studying). These are the values I supplied, not verified music-catalog metadata. Saved volume/repeat settings and mutation examples below are simulations, not additional claims about my listening history.

## Run

Use Node.js 20.19 or newer. In the folder containing package.json:

```sh
npm install
npm run all
npm run check
npm run all > output.txt
```

Verification environment: Node.js v26.13.0, TypeScript 5.8.3, React/react-dom 19.3.1 and tsx 4.23.15. npm run all and npm run check completed successfully. The recorded output.txt contains real output from npm run all. Regenerate it after changes to the final source. A successful tsx execution does not replace tsc type checking.

The starter strict, noUncheckedIndexedAccess and react-jsx settings are preserved. There is no explicit any or @ts-ignore in the source. The sole deliberate suppression is the T5 @ts-expect-error. The original all/js/ts/check scripts are preserved; a separate npm run depth command runs the optional extra file.

## What destructuring does

An array pattern takes successive values from an iterable; an object pattern selects properties by name. A declaration introduces bindings, while assignment destructuring updates existing targets. Neither operation deletes the original properties. A const binding cannot be reassigned, but objects it refers to can still be mutated.

Rest collects remaining values: `[first, ...remaining]` or `{ rating, ...publicTrack }`. Spread expands a value in an expression: `[...queue]`, `{ ...song }` or `<section {...rest}>`. They share the same dots but perform different jobs. Formal array and object binding are defined in the [ECMAScript specification](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-destructuring-binding-patterns).

The plain equivalents below explain these concrete examples, not every JavaScript edge case. Array patterns also support non-array iterables. Repeating a property access in a handwritten default expression can trigger a getter more than once. Form 8 uses object spread for its shallow copy, while avoiding destructuring.

## Field guide

Each form is implemented in both languages. Outputs in this section are the JS run, which matched the corresponding TS run. They are displayed once rather than repeating an entire second run; repeated lines within a single experiment are preserved.

### Form 1: Return the playlist duration and average rating

**Syntax:** `const [playlistSeconds, averageRating] = summarizePlaylist(songs)`

**Example** (`js/arrays.mjs`):

```js
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
```

**Output** (actual run):

```text
F1: 777 8.666666666666666
```

**Use it when:** A summary calculation returns two related results that I want to use separately: duration and average score.

**Watch out:** Positions determine the meaning. Renaming the two local variables does not change the order returned by the function. This calculation assumes a nonempty playlist; an empty playlist needs an explicit policy for its average.

**TypeScript** (`ts/arrays.ts`): Use a Song[] parameter and a [number, number] return type. The tuple promises two numeric positions, rather than an ordinary array of unknown length.

**Without destructuring:**

```js
const result = summarizePlaylist(songs)
const playlistSeconds = result[0]
const averageRating = result[1]
```

### Form 2: Skip the current song and collect the remaining queue

**Syntax:** `const [, nextSong, ...remainingSongs] = queue`

**Example** (`js/arrays.mjs`):

```js
const queue = ['Siyah', 'Uyan', 'Yine']
const [, nextSong, ...remainingSongs] = queue
console.log('F2 next:', nextSong)
console.log('F2 remaining:', JSON.stringify(remainingSongs))
```

**Output** (actual run):

```text
F2 next: Uyan
F2 remaining: ["Yine"]
```

**Use it when:** The first song is already playing. I need the next song and everything after it without modifying the original queue.

**Watch out:** The leading empty position consumes Siyah. remainingSongs is a new array containing Yine. If the queue is too short, nextSong can be undefined. Rest must be last and cannot have a trailing comma.

**TypeScript** (`ts/arrays.ts`): The queue is string[]. With noUncheckedIndexedAccess, nextSong is string | undefined, while remainingSongs is string[].

**Without destructuring:**

```js
const nextSong = queue[1]
const remainingSongs = queue.slice(2)
```

### Form 3: Swap the opening and closing songs

**Syntax:** `[openingSong, closingSong] = [closingSong, openingSong]`

**Example** (`js/arrays.mjs`):

```js
let openingSong = 'Siyah'
let closingSong = 'Yine'
console.log('F3 before:', openingSong, closingSong)
;[openingSong, closingSong] = [closingSong, openingSong]
console.log('F3 after:', openingSong, closingSong)
```

**Output** (actual run):

```text
F3 before: Siyah Yine
F3 after: Yine Siyah
```

**Use it when:** I want to reverse two selected positions without losing the original opening song.

**Watch out:** Both variables must be mutable and already declared. The right-hand array is evaluated before the assignments. The leading semicolon prevents this array-starting statement from joining the preceding expression.

**TypeScript** (`ts/arrays.ts`): Both variables have type string. Swapping a string and a number would be rejected. No new destructuring-specific type syntax is needed.

**Without destructuring:**

```js
const previousOpening = openingSong
openingSong = closingSong
closingSong = previousOpening
```

### Form 4: Defaults for missing saved playback settings

**Syntax:** `const [volume = 35, repeat = false] = savedSettings`

**Example** (`js/arrays.mjs`):

```js
// These are simulated saved settings, not claimed listening preferences.
const savedSettings = []
const [volume = 35, repeat = false] = savedSettings
console.log('F4:', volume, repeat)
```

**Output** (actual run):

```text
F4: 35 false
```

**Use it when:** A simulated saved-settings array may omit the volume or repeat flag.

**Watch out:** An item default replaces undefined, including a missing item. It does not replace null, zero or false. The settings values are invented for this experiment, not claimed as my actual player configuration.

**TypeScript** (`ts/arrays.ts`): The optional tuple [number?, boolean?] describes both positions. After these defaults, volume is number and repeat is boolean.

**Without destructuring:**

```js
const volume = savedSettings[0] === undefined ? 35 : savedSettings[0]
const repeat = savedSettings[1] === undefined ? false : savedSettings[1]
```

### Form 5: Select playlist properties by name

**Syntax:** `let { name, activity } = playlist`

**Example** (`js/objects.mjs`):

```js
const playlist = { name: 'Hardrock', activity: 'ders çalışırken' }
let { name, activity } = playlist
console.log('F5:', name, activity)
```

**Output** (actual run):

```text
F5: Hardrock ders çalışırken
```

**Use it when:** The playlist name and listening context are used together in a local calculation or display.

**Watch out:** Property names select the values regardless of the property order in these plain data objects. Reassigning a local string does not update playlist. A null or undefined source still throws.

**TypeScript** (`ts/objects.ts`): The object type declares name and activity as strings. A misspelled property is rejected instead of silently producing an undefined local value.

**Without destructuring:**

```js
let name = playlist.name
let activity = playlist.activity
```

### Form 6: Rename track fields for the current context

**Syntax:** `const { title: trackTitle, artist: artistName } = song`

**Example** (`js/objects.mjs`):

```js
const song = { title: 'Siyah', artist: 'Çilekeş' }
const { title: trackTitle, artist: artistName } = song
console.log('F6:', trackTitle, artistName)
```

**Output** (actual run):

```text
F6: Siyah Çilekeş
```

**Use it when:** I want descriptive local names, especially when playlist and song information are displayed together.

**Watch out:** The original property is on the left of each colon; the local variable is on the right. The pattern creates trackTitle and artistName, not local title and artist variables.

**TypeScript** (`ts/objects.ts`): The colon inside the pattern still means rename. Any explicit object-type annotation goes after the entire pattern.

**Without destructuring:**

```js
const trackTitle = song.title
const artistName = song.artist
```

### Form 7: Default a playlist note

**Syntax:** `const { note = 'No playlist note' } = playlist`

**Example** (`js/objects.mjs`):

```js
const playlist = { name: 'Hardrock' }
const { note = 'No playlist note' } = playlist
console.log('F7:', note)
```

**Output** (actual run):

```text
F7: No playlist note
```

**Use it when:** A playlist can have an optional note, and the display needs text when none was supplied.

**Watch out:** The default applies to undefined, including an absent note. It neither writes a note back into playlist nor replaces an explicit null.

**TypeScript** (`ts/objects.ts`): note?: string permits the absent property. Its local default removes undefined from the result type. If null were also allowed, it would remain possible.

**Without destructuring:**

```js
const note = playlist.note === undefined ? 'No playlist note' : playlist.note
```

### Form 8: Separate my rating from public track information

**Syntax:** `const { rating, ...publicTrack } = song`

**Example** (`js/objects.mjs`):

```js
const song = { title: 'Siyah', artist: 'Çilekeş', durationSeconds: 285, rating: 10 }
// Select my personal rating separately from the public track information.
const { rating, ...publicTrack } = song
console.log('F8 rating:', rating)
console.log('F8 public:', JSON.stringify(publicTrack))
```

**Output** (actual run):

```text
F8 rating: 10
F8 public: {"title":"Siyah","artist":"Çilekeş","durationSeconds":285}
```

**Use it when:** I want to handle my personal score separately while keeping title, artist and duration together.

**Watch out:** publicTrack is a new outer object that excludes rating. Object rest copies remaining own enumerable properties and does not deep-clone nested objects.

**TypeScript** (`ts/objects.ts`): Song describes the original fields. The inferred rest type excludes rating, so publicTrack.rating is a compile error.

**Without destructuring:**

```js
const rating = song.rating
const publicTrack = { ...song }
delete publicTrack.rating
```

### Form 9: Select a nested listening context and the first track

**Syntax:** `const { listening: { activity }, tracks: [firstTrack] } = playlist`

**Example** (`js/objects.mjs`):

```js
const playlist = {
  listening: { activity: 'ders çalışırken' },
  tracks: [{ title: 'Siyah' }, { title: 'Uyan' }, { title: 'Yine' }],
}
const { listening: { activity }, tracks: [firstTrack] } = playlist
console.log('F9:', activity, firstTrack?.title)
```

**Output** (actual run):

```text
F9: ders çalışırken Siyah
```

**Use it when:** A playlist has both nested metadata and an array of tracks, and I only need two small pieces of that structure.

**Watch out:** This binds activity and firstTrack, not listening or tracks. A missing listening object fails before any optional access on firstTrack. The ?. in the log handles an empty tracks array; the pattern itself is not optional chaining.

**TypeScript** (`ts/objects.ts`): tracks is an array of objects. firstTrack can be undefined, so both versions use firstTrack?.title in the log. The listening parent is required by the type.

**Without destructuring:**

```js
const activity = playlist.listening.activity
const firstTrack = playlist.tracks[0]
```

### Form 10: Choose a song field using a variable

**Syntax:** `const { [key]: value } = song`

**Example** (`js/objects.mjs`):

```js
const song = { title: 'Siyah', durationSeconds: 285, rating: 10 }
function readSongField(key) {
  const { [key]: value } = song
  return value
}
console.log('F10 rating:', readSongField('rating'))
console.log('F10 duration:', readSongField('durationSeconds'))
```

**Output** (actual run):

```text
F10 rating: 10
F10 duration: 285
```

**Use it when:** The same helper selects either a rating or a duration according to the requested field name.

**Watch out:** The brackets evaluate key. They do not request a property literally named key. Selecting different fields can also produce different value types.

**TypeScript** (`ts/objects.ts`): keyof typeof song restricts the key to real fields. The helper returns string | number because title is also a permitted field.

**Without destructuring:**

```js
const value = song[key]
```

### Form 11: Destructure playback options in parameters

**Syntax:** `function playbackOptions({ playlistName = 'Hardrock', volume = 35, repeat = false } = {})`

**Example** (`js/params.mjs`):

```js
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
```

**Output** (actual run):

```text
F11 omitted: {"playlistName":"Hardrock","volume":35,"repeat":false}
F11 supplied: {"playlistName":"Hardrock","volume":60,"repeat":false}
F11 array parameter: 285
```

**Use it when:** An options object makes named playback settings readable and permits callers to leave out settings.

**Watch out:** The outer = {} handles an omitted or undefined argument. The inner defaults handle missing or undefined fields. Neither layer replaces an explicit null argument. The settings are simulated examples.

**TypeScript** (`ts/params.ts`): PlaybackInput goes after the whole pattern. Its fields are optional so {} is a valid default. The additional array-parameter example uses a [number, number] tuple.

**Without destructuring:**

```js
function playbackOptions(options = {}) {
  const playlistName = options.playlistName === undefined ? 'Hardrock' : options.playlistName
  const volume = options.volume === undefined ? 35 : options.volume
  const repeat = options.repeat === undefined ? false : options.repeat
  return { playlistName, volume, repeat }
}
function toSeconds(pair) {
  const minutes = pair[0]
  const seconds = pair[1]
  return minutes * 60 + seconds
}
```

### Form 12: Destructure entries in rating and artist loops

**Syntax:** `for (const [title, rating] of Object.entries(ratings))`

**Example** (`js/params.mjs`):

```js
const ratings = { Siyah: 10, Uyan: 7, Yine: 9 }
for (const [title, rating] of Object.entries(ratings)) {
  console.log('F12 object:', title, rating)
}
const artists = new Map([['Siyah', 'Çilekeş'], ['Uyan', 'Pickpocket'], ['Yine', 'Kurban']])
for (const [title, artist] of artists) {
  console.log('F12 Map:', title, artist)
}
```

**Output** (actual run):

```text
F12 object: Siyah 10
F12 object: Uyan 7
F12 object: Yine 9
F12 Map: Siyah Çilekeş
F12 Map: Uyan Pickpocket
F12 Map: Yine Kurban
```

**Use it when:** Ratings and artist names are naturally associated with track titles, and a loop needs both parts of each entry.

**Watch out:** Object.entries returns own enumerable string-keyed entries. A Map already yields key/value pairs. for...in yields property-name strings, not these entry pairs, and a plain object is not itself iterable.

**TypeScript** (`ts/params.ts`): Record<string, number> describes the rating object, and Map<string, string> describes the artist entries. Object.entries does not preserve a precise union of the literal title keys here.

**Without destructuring:**

```js
for (const entry of Object.entries(ratings)) {
  const title = entry[0]
  const rating = entry[1]
  console.log('F12 object:', title, rating)
}
for (const entry of artists) {
  const title = entry[0]
  const artist = entry[1]
  console.log('F12 Map:', title, artist)
}
```

## Pitfalls

The five experiments are in js/pitfalls.mjs. Errors are intentionally caught so the complete project can continue running.

### Pitfall 1: An absent source throws

```js
for (const input of [undefined, null]) {
  try {
    const { title } = input
    console.log(title)
  } catch (error) {
    console.log(`Pitfall 1 ${String(input)}:`, `${error.name}: ${error.message}`)
  }
}
```

**Real output:**

```text
Pitfall 1 undefined: TypeError: Cannot destructure property 'title' of 'input' as it is undefined.
Pitfall 1 null: TypeError: Cannot destructure property 'title' of 'input' as it is null.
```

**Why:** An object pattern cannot read properties from null or undefined. Validate the input, or use input ?? {} if both values should mean an empty object. A parameter = {} default handles undefined, but still does not replace null.

### Pitfall 2: Defaults replace undefined, not null or zero

```js
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
```

**Real output:**

```text
Pitfall 2 missing: 35
Pitfall 2 undefined: 35
Pitfall 2 null: null
Pitfall 2 zero: 0
```

**Why:** Both the absent volume property and the explicit undefined use 35. Explicit null and 0 remain unchanged. The four labelled lines are all preserved; a repeated numeric result is meaningful evidence.

### Pitfall 3: Object assignment at statement start needs parentheses

```js
try {
  new Function('let title; { title } = { title: "Siyah" };')()
} catch (error) {
  console.log('Pitfall 3 invalid:', `${error.name}: ${error.message}`)
}
let title
;({ title } = { title: 'Siyah' })
console.log('Pitfall 3 fixed:', title)
```

**Real output:**

```text
Pitfall 3 invalid: SyntaxError: Unexpected token '='
Pitfall 3 fixed: Siyah
```

**Why:** The parser treats a statement beginning with { as a block. Parentheses force the expression interpretation. The invalid attempt is parsed with new Function so its SyntaxError can be caught; placing invalid syntax directly in this file would stop the entire file from parsing.

### Pitfall 4: Rest is a shallow copy

```js
// This mutation is an experiment, not a change to my recorded song rating.
const song = { title: 'Siyah', stats: { rating: 10 } }
const { title, ...copy } = song
copy.stats.rating = 7
console.log('Pitfall 4 original rating:', song.stats.rating)
console.log('Pitfall 4 different outer object:', copy !== song)
console.log('Pitfall 4 shared stats:', copy.stats === song.stats)
```

**Real output:**

```text
Pitfall 4 original rating: 7
Pitfall 4 different outer object: true
Pitfall 4 shared stats: true
```

**Why:** The copy is a different outer object, but its stats property still points to the original nested object. Changing copy.stats.rating therefore changes song.stats.rating. This isolated experiment does not alter the source dataset used by Form 1.

### Pitfall 5: Object names and array positions select differently

```js
const song = { title: 'Siyah', artist: 'Çilekeş' }
const { artist, title } = song
const [arrayArtist, arrayTitle] = [song.title, song.artist]
console.log('Pitfall 5 object:', artist, title)
console.log('Pitfall 5 array:', arrayArtist, arrayTitle)
```

**Real output:**

```text
Pitfall 5 object: Çilekeş Siyah
Pitfall 5 array: Siyah Çilekeş
```

**Why:** The object pattern selects artist by its property name even though artist is written first. The array pattern selects the first value, Siyah, for arrayArtist despite that misleading variable name. Array destructuring does not infer meaning from local names.

## TypeScript topics T1–T5

All five are implemented in ts/types.ts. Types check the contracts; they do not change the runtime meaning of a binding pattern.

### T1: A colon in a pattern renames

```ts
const source = { rating: 10 }
const { rating: string } = source
const { rating }: { rating: number } = source
console.log('T1:', string, typeof string, rating)
```

**Real output:**

```text
T1: 10 number 10
```

The variable named string receives the number 10. It is not a type annotation. The correct annotation is after the whole pattern: `const { rating }: { rating: number } = source`. [TypeScript destructuring documentation](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

### T2: Tuple return types and as const

```ts
function favouriteSong(): [number, string] {
  return [10, 'Siyah']
}
const [rating, title] = favouriteSong()
const fixed = [10, 'Siyah'] as const
const [fixedRating, fixedTitle] = fixed
const ten: 10 = fixedRating
const siyah: 'Siyah' = fixedTitle
console.log('T2:', rating, title, ten, siyah)
```

**Real output:**

```text
T2: 10 Siyah 10 Siyah
```

favouriteSong returns [number, string], so its first item is numeric and its second is a string. The literal as const value has type readonly [10, "Siyah"], and its bindings retain those literal types. as const does not freeze or deep-clone a runtime object. The separate compiler probe rejects fixed.push(9). [TypeScript const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

### T3: An ordinary array may be empty

```ts
const queue: string[] = []
const [first] = queue // string | undefined
const [safeFirst = 'Siyah'] = queue // string
const message = first === undefined ? 'No song selected' : first.toUpperCase()
console.log('T3:', first, safeFirst, message)
```

**Real output:**

```text
T3: undefined Siyah No song selected
```

Under noUncheckedIndexedAccess, first is string | undefined. A default produces a definite string, while an explicit undefined check narrows first before toUpperCase. A non-null assertion would merely hide the missing-value possibility. [Compiler option reference](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html).

### T4: Optional properties and defaulted bindings

```ts
type Settings = { volume?: number; note?: string | null }
const settings: Settings = { note: null }
const { volume: rawVolume } = settings // number | undefined
const { volume = 35, note = 'No playlist note' } = settings
const readyVolume: number = volume
const nullableNote: string | null = note
console.log('T4:', rawVolume, readyVolume, nullableNote)
```

**Real output:**

```text
T4: undefined 35 null
```

rawVolume is number | undefined. volume is number after its default. note remains string | null because null does not activate a default. Optional and nullable are different conditions.

### T5: An intentional compile error and its fix

```ts
const song = { title: 'Siyah' }
// @ts-expect-error T5: Property 'titel' does not exist; the property is title.
const { titel } = song
const { title } = song
console.log('T5 wrong:', titel)
console.log('T5 fixed:', title)
```

**Real output:**

```text
T5 wrong: undefined
T5 fixed: Siyah
```

The misspelling produces `error TS2339: Property 'titel' does not exist on type '{ title: string; }'.` The separate probe observed this message, recorded in compiler-errors.txt. The sole @ts-expect-error marks that one intended error in the real source. At runtime the missing property becomes undefined; selecting title fixes the code. An expected-error directive is not general permission to suppress other mistakes.

## Props and children

A function component receives one props object. children is one field of that object; it is not a second independent package. JSX passed to another named prop, such as header, remains that named prop. React's [props guide](https://react.dev/learn/passing-props-to-a-component) describes passing values and nested content.

The JS examples below import renderToStaticMarkup from react-dom/server. js/props.jsx also imports format from node:util to print the captured diagnostic. Matching typed implementations are in ts/props.tsx, using:

```tsx
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
type PlaylistProps = { name: string; children?: ReactNode }
type FrameProps = { children?: ReactNode }
type ShellProps = { name: string } & ComponentProps<'section'>
```

The output is non-interactive server-rendered HTML, not a browser playback test. Event handlers do not execute in this render. [renderToStaticMarkup reference](https://react.dev/reference/react-dom/server/renderToStaticMarkup).

### P1: Props is one object

```jsx
function PlaylistA(props) {
  return <section><h2>{props.name}</h2>{props.children}</section>
}
function PlaylistB({ name, children }) {
  return <section><h2>{name}</h2>{children}</section>
}
console.log('P1 A:', renderToStaticMarkup(
  <PlaylistA name="Hardrock"><p>ders çalışırken</p></PlaylistA>))
console.log('P1 B:', renderToStaticMarkup(
  <PlaylistB name="Hardrock"><p>ders çalışırken</p></PlaylistB>))
```

**Real rendered output:**

```text
P1 A: <section><h2>Hardrock</h2><p>ders çalışırken</p></section>
P1 B: <section><h2>Hardrock</h2><p>ders çalışırken</p></section>
```

PlaylistA reads name and children from props in its body. PlaylistB selects those fields in its parameter. The identical markup demonstrates the same contract. The latter combines Form 5 with Form 11: an object binding pattern in a function parameter. The TS signatures place PlaylistProps after the whole parameter or pattern.

### P2: children is a prop

```jsx
console.log('P2 nested:', renderToStaticMarkup(
  <PlaylistB name="Hardrock">Siyah</PlaylistB>))
console.log('P2 attribute:', renderToStaticMarkup(
  <PlaylistB name="Hardrock" children="Siyah" />))
const supplied = { children: 'Uyan' }
console.log('P2 collision:', renderToStaticMarkup(
  <PlaylistB name="Hardrock" {...supplied}>Siyah</PlaylistB>))
```

**Real rendered output:**

```text
P2 nested: <section><h2>Hardrock</h2>Siyah</section>
P2 attribute: <section><h2>Hardrock</h2>Siyah</section>
P2 collision: <section><h2>Hardrock</h2>Siyah</section>
```

The nested Siyah text and the explicit children attribute produce the same HTML. The collision example spreads children="Uyan" and also supplies nested Siyah text; nested content replaces the spread value. This illustrates precedence. A caller should normally supply one unambiguous children source.

### P3: Renderable children and a function contract

```jsx
function Frame({ children }) {
  return <div>{children}</div>
}
const cases = [
  ['string', 'Siyah'],
  ['number', 10],
  ['element', <em>Çilekeş</em>],
  ['several', [<b key="siyah">Siyah</b>, <i key="uyan">Uyan</i>]],
  ['undefined', undefined],
  ['null', null],
  ['false', false],
]
for (const [label, child] of cases) {
  console.log(`P3 ${label}:`, renderToStaticMarkup(<Frame>{child}</Frame>))
}
const renderTrackCount = count => <strong>{count} tracks</strong>
// RAW FUNCTION START
// This deliberately invalid JS attempt records React's actual diagnostic.
const diagnostics = []
const originalError = console.error
let rawMarkup
try {
  console.error = (...args) => diagnostics.push(format(...args))
  rawMarkup = renderToStaticMarkup(<Frame>{renderTrackCount}</Frame>)
} finally {
  console.error = originalError
}
console.log('P3 raw function:', rawMarkup)
for (const diagnostic of diagnostics) console.log('P3 diagnostic:', diagnostic)
// RAW FUNCTION END
// A function child works when the receiving component explicitly calls it.
function PlaylistSummary({ count, children }) {
  return <div>{children(count)}</div>
}
console.log('P3 called function:', renderToStaticMarkup(
  <PlaylistSummary count={3}>{renderTrackCount}</PlaylistSummary>))
```

**Real rendered output:**

```text
P3 string: <div>Siyah</div>
P3 number: <div>10</div>
P3 element: <div><em>Çilekeş</em></div>
P3 several: <div><b>Siyah</b><i>Uyan</i></div>
P3 undefined: <div></div>
P3 null: <div></div>
P3 false: <div></div>
P3 raw function: <div></div>
P3 diagnostic: Functions are not valid as a React child. This may happen if you return renderTrackCount instead of <renderTrackCount /> from render. Or maybe you meant to call this function rather than return it.
P3 called function: <div><strong>3 tracks</strong></div>
```

The string, number 10, one element and array of keyed elements appear in the HTML. undefined, null and false produce no content inside the div. A raw function is not called by React: the JS experiment records the actual diagnostic and an empty div. Its temporary console.error replacement is restored in finally and the diagnostic is printed into stdout. PlaylistSummary instead explicitly accepts a function and calls children(count), producing the 3 tracks element. Its TS contract is `{ count: number; children: (count: number) => ReactNode }`. An ordinary Frame with children?: ReactNode rejects an uncalled function. The negative compiler probe demonstrates that rejection without adding a second suppression to the main project.

### P4: Collect children separately and forward rest

```jsx
function FixedStyle({ name, children, ...rest }) {
  return <section {...rest} className="music"><h2>{name}</h2>{children}</section>
}
function CallerStyle({ name, children, ...rest }) {
  return <section className="music" {...rest}><h2>{name}</h2>{children}</section>
}
console.log('P4 explicit last:', renderToStaticMarkup(
  <FixedStyle name="Hardrock" id="study-list" className="study">Siyah</FixedStyle>))
console.log('P4 spread last:', renderToStaticMarkup(
  <CallerStyle name="Hardrock" id="study-list" className="study">Siyah</CallerStyle>))
```

**Real rendered output:**

```text
P4 explicit last: <section id="study-list" class="music"><h2>Hardrock</h2>Siyah</section>
P4 spread last: <section class="study" id="study-list"><h2>Hardrock</h2>Siyah</section>
```

The parameter uses object rest to collect unhandled fields, then JSX spread forwards them to section. FixedStyle writes className last, so music wins. CallerStyle spreads last, so the supplied study value wins. id is forwarded in both. name is consumed as the heading, not forwarded. The type combines the custom name with native section props; the code should forward only intended DOM-compatible values. The attribute ordering in the strings can differ without changing which class value won.

### P5: Named slots or children-only composition

```jsx
function PlayerWithSlots({ header, footer, children }) {
  return <section><header>{header}</header><main>{children}</main><footer>{footer}</footer></section>
}
function PlayerWithChildren({ children }) {
  return <section>{children}</section>
}
const trackList = <ol><li>Siyah</li><li>Uyan</li><li>Yine</li></ol>
console.log('P5 named slots:', renderToStaticMarkup(
  <PlayerWithSlots header={<h3>Hardrock</h3>} footer={<small>3 tracks</small>}>
    {trackList}
  </PlayerWithSlots>))
console.log('P5 children only:', renderToStaticMarkup(
  <PlayerWithChildren>
    <header><h3>Hardrock</h3></header><main>{trackList}</main>
    <footer><small>3 tracks</small></footer>
  </PlayerWithChildren>))
```

**Real rendered output:**

```text
P5 named slots: <section><header><h3>Hardrock</h3></header><main><ol><li>Siyah</li><li>Uyan</li><li>Yine</li></ol></main><footer><small>3 tracks</small></footer></section>
P5 children only: <section><header><h3>Hardrock</h3></header><main><ol><li>Siyah</li><li>Uyan</li><li>Yine</li></ol></main><footer><small>3 tracks</small></footer></section>
```

Both approaches produce the same section/header/main/footer markup. PlayerWithSlots owns that structure and lets the caller supply header, footer and body contents. This suits a consistent player layout. PlayerWithChildren lets the caller choose the entire inner structure and ordering, which suits open-ended composition. In the slot version header and footer are named props and the ol is children. In the children-only version the header, main and footer are all children.

### P6: Undefined triggers a prop default; null does not

```jsx
function PlaylistNote({ note = 'No listening note' }) {
  return <p>{note}</p>
}
console.log('P6 missing:', renderToStaticMarkup(<PlaylistNote />))
console.log('P6 undefined:', renderToStaticMarkup(<PlaylistNote note={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<PlaylistNote note={null} />))
console.log('P6 empty string:', renderToStaticMarkup(<PlaylistNote note="" />))
```

**Real rendered output:**

```text
P6 missing: <p>No listening note</p>
P6 undefined: <p>No listening note</p>
P6 null: <p></p>
P6 empty string: <p></p>
```

The missing and explicitly undefined note use the fallback. null remains null and produces an empty p. The empty string also stays unchanged and renders no text. This is Form 7 inside a parameter pattern. The TS type deliberately allows note?: string | null so the null experiment is legal.

### P7: Three ways to describe props

```jsx
function RatingBox({ children }) {
  return <aside>{children}</aside>
}
function ListeningBox({ label, children }) {
  return <aside><strong>{label}</strong>{children}</aside>
}
function QueueButton({ children, ...rest }) {
  return <button {...rest}>{children}</button>
}
console.log('P7 ReactNode:', renderToStaticMarkup(<RatingBox>{10}</RatingBox>))
console.log('P7 PropsWithChildren:', renderToStaticMarkup(
  <ListeningBox label="Studying">Hardrock</ListeningBox>))
console.log('P7 ComponentProps:', renderToStaticMarkup(
  <QueueButton type="button" disabled aria-label="Queue Siyah">Queue</QueueButton>))
```

**Real rendered output:**

```text
P7 ReactNode: <aside>10</aside>
P7 PropsWithChildren: <aside><strong>Studying</strong>Hardrock</aside>
P7 ComponentProps: <button type="button" disabled="" aria-label="Queue Siyah">Queue</button>
```

children?: ReactNode explicitly allows omitted children and renderable values such as numbers, strings and elements. It rejects an ordinary uncalled function and an arbitrary plain object. PropsWithChildren<{ label: string }> adds optional children while preserving the required label. ComponentProps<'button'> obtains the native button props, including type, disabled, onClick and children; it does not forward or render them by itself. The spread in QueueButton performs the forwarding. [React TypeScript guide](https://react.dev/learn/typescript).

Typed implementations:

```tsx
function RatingBox({ children }: { children?: ReactNode }) {
  return <aside>{children}</aside>
}
function ListeningBox({ label, children }: PropsWithChildren<{ label: string }>) {
  return <aside><strong>{label}</strong>{children}</aside>
}
function QueueButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
```

The separate compiler experiment rejected an uncalled function for RatingBox, a missing required label for ListeningBox, href for QueueButton, and a string disabled value. These attempts are saved as text in compiler-probe.txt, not left as errors in the passing source. The actual messages include:

```text
error TS2322: Type '() => string' is not assignable to type 'ReactNode'.
error TS2741: Property 'label' is missing in type '{ children: string; }' but required in type '{ label: string; }'.
error TS2322: Type '{ children: string; href: string; }' is not assignable to type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>'.
  Property 'href' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>'. Did you mean 'ref'?
error TS2322: Type 'string' is not assignable to type 'boolean | undefined'.
```

Props are read-only inputs to a component. Mutating props is not a way to update a parent. The key used on the list elements is React bookkeeping, not an ordinary readable props.key; pass another identifier prop if a component needs it. [React key warning](https://react.dev/warnings/special-props).

## JavaScript versus TypeScript

The first two columns describe the same runtime patterns. The errors below are actual results from the deliberately invalid compiler probe; they are not unresolved errors in npm run check. Inference often supplies types without an explicit annotation. Union bars are displayed as ∣ in this table to keep its columns intact; the untouched ASCII | messages are in compiler-errors.txt.

| Form | What stays the same | Type information used or needed | Actual error in the wrong version |
| --- | --- | --- | --- |
| 1 | Position selects each returned result | A tuple return, such as [number, number] | TS2322: `Type 'string ∣ number ∣ undefined' is not assignable to type 'number'.` |
| 2 | Skip one item and collect the rest | string[] and a possible undefined indexed item | TS18048: `'first' is possibly 'undefined'.` |
| 3 | RHS values are evaluated before swapping | Compatible types for both existing variables | TS2322: `Type 'number' is not assignable to type 'string'.` |
| 4 | Only undefined activates the default | Optional tuple positions and compatible default values | TS2322: `Type 'number ∣ "unknown"' is not assignable to type 'number'.` |
| 5 | Select properties by name | The declared/inferred object fields | TS2339: `Property 'titel' does not exist on type '{ title: string; }'.` |
| 6 | A colon renames a local binding | Annotation outside the pattern, if needed | TS2304: `Cannot find name 'artist'.` |
| 7 | A field default does not replace null | Optional fields; a default removes undefined | TS2322: `Type 'number ∣ undefined' is not assignable to type 'number'.` |
| 8 | Selected fields are excluded from rest | Inferred rest type without rating | TS2339: `Property 'rating' does not exist on type '{ title: string; }'.` |
| 9 | Nested patterns follow the source shape | Required/guarded parents, possible missing array item | TS2339: `Property 'activity' does not exist on type '{ activity: string; } ∣ undefined'.` |
| 10 | [key] evaluates a property name | keyof typeof song for a known-key helper | TS2537: `Type '{ title: string; rating: number; }' has no matching index signature for type 'string'.` |
| 11 | Parameter and property defaults are separate | An input type after the entire pattern | TS2741: `Property 'playlistName' is missing in type '{}' but required in type '{ playlistName: string; }'.` |
| 12 | Object.entries and Map yield entry pairs | Record and Map key/value types | TS2488: `Type '{ Siyah: number; }' must have a '[Symbol.iterator]()' method that returns an iterator.` |

keyof is a type-level union of permitted property names, not a runtime transform. [TypeScript keyof reference](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html).

## Reproducing the negative compiler experiment

compiler-probe.txt contains the deliberately invalid examples for the table and P7. compiler-errors.txt contains the actual diagnostics from that separate compiler run. To reproduce separately:

```sh
cp compiler-probe.txt _compiler_probe.tsx
node node_modules/typescript/bin/tsc --noEmit --strict --noUncheckedIndexedAccess --skipLibCheck --target ES2022 --module NodeNext --moduleResolution NodeNext --jsx react-jsx _compiler_probe.tsx --pretty false > compiler-errors.txt
rm _compiler_probe.tsx
npm run check
```

The explicit probe command should fail. The generated _compiler_probe.tsx must then be removed; the normal project check must pass. Source-file line numbers and wording can vary with compiler versions, so record what your own run actually prints.

## Bonus 2: Depth

This is an optional worked study section, not a claimed bonus yet. Its source is js/depth.mjs. Run:

```sh
npm run depth
```

```js
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
```

**Real output** (also in depth-output.txt):

```text
B2 string: Ç ilekeş
B2 Set: Siyah ["Uyan","Yine"]
B2 Map: Siyah 10
B2 generator: started
B2 generator: closed
B2 generator first: Siyah
B2 defaults: 35 25 null 1
B2 initialization: ReferenceError: Cannot access 'later' before initialization
B2 assignment targets: {"current":"Siyah","next":"Uyan"}
```

### Iterable values and early generator closure

The string pattern consumes the string iterator; Set removes duplicate Siyah entries and retains insertion order. Map yields entry arrays, so a nested pattern extracts a title and its rating. The generator prints started and closed without requesting its second song: taking one item closes the unfinished iterator, running finally. Change `[firstSong]` to `[firstSong, ...remaining]` to investigate full consumption of this finite generator. Do not collect an infinite iterator with rest.

### Default evaluation and initialization order

Only the first missing value calls defaultVolume. quietVolume can read the earlier initialized volume; null prevents the third initializer from running. The counter is therefore 1. The separate later-binding experiment throws a ReferenceError because later is still uninitialized when the first default tries to read it. Reorder dependencies or calculate them outside the pattern. These behaviors are described by the [ECMAScript binding algorithms](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-destructuring-binding-patterns).

### Existing assignment targets

Assignment destructuring can target playback.current and playback.next. It need not declare new variables. A declaration pattern instead introduces bindings. The printed object shows the existing properties receiving the two queue values.

Before claiming this bonus, make a meaningful variation, record its actual output and explain why it changed. Add Bonus 2: Depth to the bonus list only after that work.

## Submission checks

- Complete and understand the examples and explanations, including the difference between rest and spread.
- Regenerate output.txt from the final npm run all and check each README output block.
- Review all five personal log entries and keep each entry consistent with the actual experiment and output.
- Keep the correct name/student number at the top of each source file.
- Keep strict settings and only the single T5 suppression.
- Zip one assignment4 folder without node_modules or .git. Upload to Moodle by its announced deadline.
- Bonus 1 needs the full LaTeX source and compiled PDF; Bonus 3 needs at least five actual file/line cases from the required real-code sources, including the missing Assignment 3 sample; Bonus 4 needs a real accessible repository and genuine multi-day history. None is claimed here.

## My own log


### 1. Comparing my prediction with the playlist summary

Before running the code, I expected the total duration to be
740 seconds and the average rating to be 8.

**Command:**

```sh
node js/arrays.mjs
```

**Actual output:**

```text
F1: 777 8.666666666666666
```

**Explanation:**

The total duration is 285 + 231 + 261 = 777 seconds.
The average rating is (10 + 7 + 9) / 3 = 26 / 3,
which is approximately 8.67.

The function returns an array containing the total duration first
and the average rating second. Array destructuring assigns these
values to playlistSeconds and averageRating in that order.
The positions determine the assignments, not the variable names.

### 2. Defaults for undefined and null

**What I actually tried:** I ran `node js/pitfalls.mjs` and compared the missing, undefined, null and zero cases.

**Actual output:**

```text
Pitfall 2 missing: 35
Pitfall 2 undefined: 35
Pitfall 2 null: null
Pitfall 2 zero: 0
```

**Observed result:** The missing and undefined cases printed 35. The null and zero cases kept their supplied values.

**Explanation:**

In `const { volume = 35 } = settings`, the default is used only when the extracted value is `undefined`. A missing property also produces `undefined`, so both of those cases use 35. An explicit `null` remains null, and 0 remains 0. Zero is a valid volume value, so a destructuring default does not replace it. If both null and undefined should use a fallback, that requires a separate rule such as `value ?? 35`.

### 3. Assignment parentheses

**What I actually tried:** I ran the invalid and parenthesized assignment experiments in `node js/pitfalls.mjs`.

**Actual output:**

```text
Pitfall 3 invalid: SyntaxError: Unexpected token '='
Pitfall 3 fixed: Siyah
```

**Observed result:** The invalid attempt produced a SyntaxError. The parenthesized assignment printed Siyah. The invalid attempt was isolated and caught, so the rest of the file continued running.

**Explanation:**

At the beginning of a statement, JavaScript reads `{ title }` as a block rather than an object assignment pattern. The following `=` therefore causes a SyntaxError. Writing `({ title } = { title: 'Siyah' })` puts the assignment inside an expression, so the pattern assigns the title property to the existing title variable. The invalid attempt is parsed separately with `new Function` and caught; otherwise invalid syntax in the main file would prevent that file from running.

### 4. A shared nested object

**What I actually tried:** I ran the rest-copy experiment in `node js/pitfalls.mjs`, which assigns 7 to copy.stats.rating.

**Actual output:**

```text
Pitfall 4 original rating: 7
Pitfall 4 different outer object: true
Pitfall 4 shared stats: true
```

**Observed result:** The original rating became 7. The outer objects were different, while both stats properties referred to the same nested object.

**Explanation:**

Object rest creates a new outer object, but it copies the reference to the nested stats object. As a result, `copy !== song` is true, while `copy.stats === song.stats` is also true. Both stats properties refer to the same nested object. Assigning 7 to `copy.stats.rating` therefore makes `song.stats.rating` show 7 too. This is a shallow copy, not a deep copy of the nested data.

### 5. A function passed as children

**What I actually tried:** I ran `npx tsx js/props.jsx` and compared the raw function child with the version where PlaylistSummary calls the function.

**Actual output:**

```text
P3 raw function: <div></div>
P3 diagnostic: Functions are not valid as a React child. This may happen if you return renderTrackCount instead of <renderTrackCount /> from render. Or maybe you meant to call this function rather than return it.
P3 called function: <div><strong>3 tracks</strong></div>
```

**Observed result:** Passing the function itself to Frame produced an empty div and a diagnostic. When PlaylistSummary called the function with the count 3, the returned strong element appeared in the HTML.

**Explanation:**

Passing a function as a prop does not call it. Frame places its children directly inside a div, and an ordinary function is not a renderable React child. PlaylistSummary uses a different contract: its children prop is a function, and the component explicitly calls children(count). The returned React element can then be rendered. In TypeScript, children?: ReactNode rejects an ordinary function, while children: (count: number) => ReactNode describes the function contract used by PlaylistSummary.

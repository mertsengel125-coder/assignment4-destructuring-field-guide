// Arif Mert Şengel — 2024501012
// Destructuring examples based on the Hardrock playlist.
import { format } from 'node:util'
import { renderToStaticMarkup } from 'react-dom/server'

// P1
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

// P2
console.log('P2 nested:', renderToStaticMarkup(
  <PlaylistB name="Hardrock">Siyah</PlaylistB>))
console.log('P2 attribute:', renderToStaticMarkup(
  <PlaylistB name="Hardrock" children="Siyah" />))
const supplied = { children: 'Uyan' }
console.log('P2 collision:', renderToStaticMarkup(
  <PlaylistB name="Hardrock" {...supplied}>Siyah</PlaylistB>))

// P3
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

// P4
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

// P5
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

// P6
function PlaylistNote({ note = 'No listening note' }) {
  return <p>{note}</p>
}
console.log('P6 missing:', renderToStaticMarkup(<PlaylistNote />))
console.log('P6 undefined:', renderToStaticMarkup(<PlaylistNote note={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<PlaylistNote note={null} />))
console.log('P6 empty string:', renderToStaticMarkup(<PlaylistNote note="" />))

// P7
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

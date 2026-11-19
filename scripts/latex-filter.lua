-- Arif Mert Şengel - 2024501012
local function normalize(text)
  return text:gsub('–', '-'):gsub('—', '-'):gsub('‑', '-'):gsub('∣', '|')
end
function Str(value)
  value.text = normalize(value.text)
  return value
end
function Code(value)
  value.text = normalize(value.text):gsub('∣', '|')
  return value
end
function CodeBlock(value)
  value.text = normalize(value.text):gsub('∣', '|')
  local languages = {js='JavaScript', javascript='JavaScript', jsx='JSX', ts='TypeScript', typescript='TypeScript', tsx='TSX', sh='sh', bash='bash'}
  local language = languages[value.classes[1]]
  local options = language and ('[language=' .. language .. ']') or ''
  local _, newlines = value.text:gsub('\n', '\n')
  local needed = math.min(newlines + 3, 8) * 10.3
  return pandoc.RawBlock('latex', '\\Needspace{' .. needed .. 'pt}\n\\begin{lstlisting}' .. options .. '\n' .. value.text .. '\n\\end{lstlisting}')
end
function Para(value)
  local first = value.content[1]
  local label = first and first.t == 'Strong' and pandoc.utils.stringify(first) or ''
  if label:match('^Example') or label:match('^Output') or label:match('^Real') or label:match('^Without destructuring') then
    return {pandoc.RawBlock('latex', '\\Needspace{9\\baselineskip}'), value}
  end
end
function Table(value)
  if #value.colspecs == 4 then
    local columns = value.colspecs
    local widths = {0.06, 0.24, 0.30, 0.40}
    for index, width in ipairs(widths) do columns[index][2] = width end
    value.colspecs = columns
  end
  return value
end

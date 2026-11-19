# Arif Mert Şengel - 2024501012
"""Convert the complete Markdown guide to a self-contained LaTeX source."""
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
import argparse, subprocess, tempfile, re

root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--pandoc',default='pandoc')
parser.add_argument('--output',default='latex/main.tex')
options=parser.parse_args()
text=(root/'README.md').read_text()
# The same title, name and student number appear on the PDF title page.
text=text.replace('# Destructuring Field Guide — Hardrock\n','',1)
text=text.replace('Name: Arif Mert Şengel  \nStudent number: 2024501012\n','',1)
destination=root/options.output
destination.parent.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(prefix='hardrock-latex-') as temporary:
    markdown=Path(temporary)/'guide.md'
    markdown.write_text(text)
    args=[options.pandoc,str(markdown),'--from','markdown-smart','--to','latex',
          '--standalone','--toc','--toc-depth','1','--number-sections','--shift-heading-level-by=-1',
          '--syntax-highlighting=idiomatic','--lua-filter',str(root/'scripts/latex-filter.lua'),
          '--include-in-header',str(root/'scripts/latex-header.tex'),
          '--metadata','title=Destructuring Field Guide - Hardrock',
          '--metadata','subtitle=JavaScript, TypeScript and React - MIS 233',
          '--metadata','author=Arif Mert Şengel - 2024501012',
          '--metadata','date='+datetime.now(ZoneInfo('Europe/Istanbul')).strftime('%d %B %Y'),
          '--variable','documentclass=article','--variable','classoption=titlepage',
          '--variable','fontsize=10pt','--variable','papersize=a4',
          '--variable','geometry=margin=22mm','--variable','colorlinks=true',
          '--variable','linkcolor=guideink','--variable','urlcolor=guideaccent','--variable','citecolor=guideink',
          '--output',str(destination)]
    subprocess.run(args,cwd=root,check=True)
tex=destination.read_text()
# The guide's tables have no captions, so omit this unused template setting.
tex=re.sub(r'\\captionsetup\[table\]\{[^}]*\}\n','',tex)
tex='% Arif Mert Şengel - 2024501012\n'+tex
destination.write_text(tex)
print(destination)

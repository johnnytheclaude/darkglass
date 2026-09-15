# -*- coding: utf-8 -*-
"""Zhusteny vypis podstromu navrhu z Penu podle data-pencil-name.

Pouziti:
    python3 tools/extract-navrh.py <knihovna-light.html> "<data-pencil-name>"

Zdroj navrhu: cashregister-pokladna/docs/navrh/html/knihovna-{light,dark}.html.
Verzovana nastupkyne drivejsiho scratch/extract.py — ta byla mimo git (scratch
je v .gitignore), takze se jeji past vracela. Viz task #509.
"""
import sys, re
from html.parser import HTMLParser

# Pen kresli ramecky jako outline (+ zaporny outline-offset), ne jako border —
# bez techhle klicu zmizi z extraktu vlasova linka a knihovna se postavi bez ni
# (task #509). Nikdy je z KEEP nevyhazuj.
KEEP = ('background-color','color','border','border-radius','outline','outline-offset',
        'outline-color','outline-width','outline-style','font-size','font-weight',
        'gap','padding','width','height','min-width','min-height','flex-direction',
        'align-items','justify-content','box-shadow','letter-spacing','opacity','text-align')

def cond(style):
    out=[]
    for part in style.split(';'):
        part=part.strip()
        if not part: continue
        k=part.split(':')[0].strip()
        if k in KEEP:
            v=part.split(':',1)[1].strip()
            if k=='background-color' and v in ('#FFFFFF00','transparent'): continue
            if k in ('width','height') and v=='fit-content': continue
            if k=='box-sizing': continue
            out.append(k+':'+v)
    return '; '.join(out)

class P(HTMLParser):
    def __init__(self, want):
        super().__init__(convert_charrefs=True)
        self.want=want; self.depth=0; self.on=None; self.buf=[]; self.txt=''
    def emit(self,s):
        self.buf.append(s)
    def flush(self):
        t=' '.join(self.txt.split())
        if t: self.emit('  '*(self.depth-self.on)+'» '+t)
        self.txt=''
    def handle_starttag(self,tag,attrs):
        a=dict(attrs); self.depth+=1
        name=a.get('data-pencil-name')
        if self.on is None and name==self.want: self.on=self.depth
        if self.on is not None:
            self.flush()
            if name or a.get('style'):
                ind='  '*(self.depth-self.on)
                st=cond(a.get('style',''))
                self.emit(f'{ind}{tag} [{name or ""}] {st}')
    def handle_endtag(self,tag):
        if self.on is not None:
            self.flush()
            if self.depth==self.on: self.on=None
        self.depth-=1
    def handle_data(self,d):
        if self.on is not None: self.txt+=d

src=open(sys.argv[1],encoding='utf-8').read()
p=P(sys.argv[2]); p.feed(src)
print('\n'.join(p.buf))

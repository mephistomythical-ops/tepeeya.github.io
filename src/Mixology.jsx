import React, { useEffect, useRef, useState } from 'react';
import { asset } from './content';
import './mixology.css';

const inspirations = [
  { id: 'cocktails', tab: 'Cocktails', title: 'A golden twist.', image: 'mix-pour.webp', alt: 'TEPEEYA being poured over ice', items: [
    ['Tepache Margarita', 'Tepache · Tequila · Fresh lime · Ice'],
    ['Tropical Rum Cooler', 'Tepache · Rum · Mint · Pineapple'],
    ['Tepache Mule', 'Tepache · Ginger beer · Fresh lime'],
  ] },
  { id: 'mocktails', tab: 'Mocktails', title: 'Tropical, your way.', image: 'mix-golden.webp', alt: 'A golden glass of TEPEEYA beside the bottle', items: [
    ['Pineapple Mint Refresher', 'Tepache · Fresh mint · Lime · Ice'],
    ['Tropical Citrus Fizz', 'Tepache · Orange · Lime · Sparkling water'],
    ['Ginger Pineapple Cooler', 'Tepache · Ginger · Lemon · Crushed ice'],
  ] },
  { id: 'refreshers', tab: 'Refreshers', title: 'Simply refreshing.', image: 'mix-serve.webp', alt: 'TEPEEYA served over ice at a tropical bar', items: [
    ['Over ice', 'TEPEEYA. Ice. A moment to yourself.'],
    ['With fresh lime', 'A squeeze of something bright.'],
    ['With sparkling water', 'A little extra sparkle.'],
    ['With tropical fruit', 'Finish with your favourite fruit garnish.'],
  ] },
];

export function PourGlass() {
  return <div className="pour-landing" aria-hidden="true">
    <span className="pour-caption">THE NEXT POUR IS YOURS.</span>
    <svg className="pour-glass" viewBox="0 0 180 210" fill="none">
      <defs>
        <linearGradient id="glass-light" x1="30" x2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".65"/><stop offset=".45" stopColor="#fff" stopOpacity=".08"/><stop offset="1" stopColor="#fff" stopOpacity=".5"/></linearGradient>
        <linearGradient id="glass-tepache" x2="0" y2="1"><stop stopColor="#edcf77" stopOpacity=".8"/><stop offset="1" stopColor="#b77a27" stopOpacity=".55"/></linearGradient>
        <clipPath id="glass-interior"><path d="M39 39 L51 162 Q90 179 129 162 L141 39Z"/></clipPath>
      </defs>
      <ellipse cx="90" cy="191" rx="65" ry="5" fill="#000" opacity=".1"/>
      <path d="M35 34 L48 167 Q90 186 132 167 L145 34" fill="url(#glass-light)" stroke="#e8e0be" strokeWidth="1.2"/>
      <g clipPath="url(#glass-interior)"><g className="glass-fill"><path d="M35 84 Q90 94 145 84 V179 H35Z" fill="url(#glass-tepache)"/><ellipse cx="90" cy="86" rx="55" ry="7" fill="#f1d589" opacity=".7"/></g>
        <g stroke="#fff7dd" opacity=".35"><rect x="56" y="92" width="34" height="34" rx="7" transform="rotate(-15 73 109)"/><rect x="91" y="103" width="29" height="29" rx="6" transform="rotate(16 105 117)"/></g>
        <g className="glass-bubbles" fill="#fff3c2"><circle cx="71" cy="145" r="2"/><circle cx="106" cy="135" r="1.6"/><circle cx="84" cy="115" r="1.5"/></g>
      </g>
      <ellipse cx="90" cy="34" rx="55" ry="9" stroke="#f8f1d9" strokeWidth="1.2"/>
      <path d="M44 51 L55 157 M134 53 L125 153" stroke="#fff" opacity=".4"/>
      <g className="glass-splash" stroke="#f3d889" strokeWidth="1.5" strokeLinecap="round"><path d="M90 36 Q80 18 69 25 M90 36 Q100 16 112 24"/><circle cx="66" cy="21" r="1.5" fill="#f3d889"/><circle cx="115" cy="19" r="1" fill="#f3d889"/></g>
    </svg>
    <span className="pour-caption">POUR A LITTLE GOLD.</span>
  </div>;
}

export default function Mixology({ motionOff, Film }) {
  const section = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const choice = inspirations[selected];
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function close() { dialog.current.close(); }
  function onKeys(event) {
    if (event.key !== 'Tab') return;
    const items = [...dialog.current.querySelectorAll('button:not([tabindex="-1"]), a[href]')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function selectTab(event, index) {
    const keys = { ArrowRight: (index + 1) % 3, ArrowLeft: (index + 2) % 3, Home: 0, End: 2 };
    if (!(event.key in keys)) return;
    event.preventDefault(); setSelected(keys[event.key]);
    dialog.current.querySelectorAll('[role="tab"]')[keys[event.key]].focus();
  }
  return <section id="refreshment" className="mixology" ref={section} aria-labelledby="mixology-heading">
    <div className="mix-stage">
      <Film name="mixology" poster="mixology-poster.webp" hero label="Beyond the Bottle film" triggerRef={section} motionOff={motionOff} />
      <div className="mix-shade" />
      <p className="mix-kicker eyebrow">THE ART OF REFRESHMENT</p>
      <div className="mix-copy"><h2 id="mixology-heading">Beyond<br/>the Bottle.</h2><p>Pour it. Mix it. Make it yours.</p></div>
      <button className="mix-trigger" ref={trigger} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-controls="mix-dialog"><span className="mix-trigger-icon" aria-hidden="true">✧</span><span>Mix with TEPEEYA<small>COCKTAILS · MOCKTAILS · REFRESHERS</small></span><span aria-hidden="true">↗</span></button>
    </div>
    <PourGlass />
    <dialog id="mix-dialog" className="mix-dialog" ref={dialog} aria-labelledby="mix-dialog-title" onKeyDown={onKeys} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target !== dialog.current) return; const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); }}>
      <button autoFocus className="mix-close" onClick={close} aria-label="Close mixing inspirations">×</button>
      <div className="mix-dialog-head"><p className="eyebrow">A LITTLE INSPIRATION</p><h2 id="mix-dialog-title">Mix with TEPEEYA</h2></div>
      <div role="tablist" aria-label="Mixing inspiration categories" className="mix-tabs">{inspirations.map((item, index) => <button role="tab" key={item.id} id={`mix-tab-${item.id}`} aria-selected={selected === index} aria-controls="mix-panel" tabIndex={selected === index ? 0 : -1} onKeyDown={e => selectTab(e, index)} onClick={() => setSelected(index)}>{item.tab}</button>)}</div>
      <div role="tabpanel" id="mix-panel" aria-labelledby={`mix-tab-${choice.id}`} className="mix-panel" key={choice.id}>
        <figure><img src={asset(choice.image)} alt={choice.alt} width="800" height="450" loading="lazy"/><figcaption>{choice.title}</figcaption></figure>
        <div className="mix-ideas">{choice.items.map(([title, ingredients], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{ingredients}</p></div></article>)}</div>
      </div>
      <p className="mix-dialog-foot">YOUR GLASS. YOUR EXPRESSION.</p>
    </dialog>
  </section>;
}

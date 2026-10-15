import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { flavours, classic, asset } from './content';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

function useMedia(query) {
  const [value, setValue] = useState(() => matchMedia(query).matches);
  useEffect(() => { const media = matchMedia(query); const update = () => setValue(media.matches); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, [query]);
  return value;
}

function Film({ name, poster, label, hero = false, triggerRef, motionOff }) {
  const ref = useRef(null);
  const userPaused = useRef(false);
  const pendingPlay = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [manual, setManual] = useState(false);
  const touch = useMedia('(max-width: 767px), (pointer: coarse)');
  const saveData = navigator.connection?.saveData;
  const scrub = !hero && !touch && !motionOff && !saveData;
  useEffect(() => {
    const video = ref.current;
    if (motionOff || saveData) { video.pause(); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoaded(true);
    }, { rootMargin: hero ? '0px' : '180px' });
    io.observe(video);
    return () => io.disconnect();
  }, [hero, motionOff, saveData]);
  useEffect(() => {
    const video = ref.current;
    if (!loaded) return;
    let st;
    let target = 0;
    const seek = () => {
      if (!video.seeking && Number.isFinite(video.duration) && Math.abs(video.currentTime - target) > .045) video.currentTime = target;
    };
    const ready = () => {
      if (!scrub) return;
      st?.kill();
      st = ScrollTrigger.create({ trigger: triggerRef.current, start: 'top top', end: 'bottom bottom', onUpdate: self => { target = self.progress * Math.max(0, video.duration - .08); seek(); } });
      target = st.progress * Math.max(0, video.duration - .08); seek();
    };
    video.addEventListener('loadedmetadata', ready);
    video.addEventListener('seeked', seek);
    if (video.readyState >= 1) ready();
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || document.hidden) video.pause();
      else if (!scrub && !motionOff && !saveData && !userPaused.current) video.play().catch(() => {});
    }, { threshold: .15 });
    io.observe(video);
    const visibility = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { st?.kill(); io.disconnect(); video.removeEventListener('loadedmetadata', ready); video.removeEventListener('seeked', seek); document.removeEventListener('visibilitychange', visibility); video.pause(); };
  }, [loaded, scrub, motionOff, saveData, triggerRef, touch]);
  async function toggle() {
    const video = ref.current;
    if (playing) { userPaused.current = true; video.pause(); return; }
    userPaused.current = false;
    setManual(true);
    if (!loaded) { pendingPlay.current = true; setLoaded(true); return; }
    try { await video.play(); } catch { setPlaying(false); }
  }
  return <div className={`film film-${name}`}>
    <video ref={ref} src={loaded ? asset(`${name}${touch || saveData ? '-mobile' : ''}.mp4`) : undefined} poster={asset(poster)} preload={loaded ? 'auto' : 'none'} muted playsInline loop={!scrub} aria-label={label} onLoadedData={() => { if (pendingPlay.current) { pendingPlay.current = false; ref.current.play().catch(() => setPlaying(false)); } }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    {!scrub && !failed && (!motionOff || manual || !playing) && <button className="film-control" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span> {playing ? 'Pause film' : 'Play film'}</button>}
    {failed && <span className="film-status">Film unavailable · original photography shown</span>}
  </div>;
}

function Chapter({ id, number, title, italic, caption, body, name, poster, motionOff, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (motionOff) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.chapter-copy', { y: 35 }, { y: -25, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.fromTo('.film video', { scale: 1.035 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      gsap.fromTo('.chapter-progress span', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, [motionOff]);
  return <section ref={ref} id={id} className={`chapter ${id} ${motionOff ? 'still' : ''}`} aria-labelledby={`${id}-heading`}>
    <div className="chapter-stage">
      <Film name={name} poster={poster} label={`${caption} film`} triggerRef={ref} motionOff={motionOff} />
      <div className="chapter-shade" />
      <div className="chapter-top"><span>{number} / THE TEPEEYA STORY</span><span>{caption}</span></div>
      <div className="chapter-copy"><p className="eyebrow">{caption}</p><h2 id={`${id}-heading`}>{title}<br /><em>{italic}</em></h2><p>{body}</p>{children}</div>
      <div className="chapter-bottom"><span>{number === '01' ? 'ROOTED IN PINEAPPLE' : 'MADE FOR THE MOMENT'}</span><div className="chapter-progress"><span /></div><span>TEPEEYA</span></div>
    </div>
  </section>;
}

function Collection({ motionOff }) {
  const [selected, setSelected] = useState('classic');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dialog = useRef(null);
  const opener = useRef(null);
  const flavour = flavours.find(f => f.id === selected);
  const panel = useRef(null);
  useEffect(() => {
    if (!detailsOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, [detailsOpen]);
  function openFlavour(id, button) {
    opener.current = button;
    setSelected(id);
    setDetailsOpen(true);
  }
  function closeDetails() { dialog.current.close(); }
  function containFocus(event) {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  useLayoutEffect(() => {
    if (motionOff) return;
    const tween = gsap.fromTo(panel.current, { opacity: .35, y: 8 }, { opacity: 1, y: 0, duration: .4 });
    return () => tween.revert();
  }, [selected, motionOff]);
  return <section id="flavours" className="collection" aria-labelledby="collection-heading">
    <div className="section-heading reveal"><p className="eyebrow">THE COLLECTION · FIVE EXPRESSIONS</p><h2 id="collection-heading">Find your <em>golden.</em></h2><p>One tropical tradition. A world of character.<br />Explore the TEPEEYA collection.</p></div>
    <div className="flavour-grid" aria-label="Select a flavour">
      {flavours.map((f, i) => <button key={f.id} className={`flavour-card ${selected === f.id ? 'selected' : ''}`} style={{ '--flavour': f.colour }} aria-pressed={selected === f.id} aria-haspopup="dialog" aria-controls="flavour-dialog" onClick={event => openFlavour(f.id, event.currentTarget)}>
        <span className="card-index">0{i + 1}</span><span className="selected-mark" aria-hidden="true">{selected === f.id ? '✓' : '↗'}</span>
        <div className={`card-image ${f.id}`}><img src={asset(f.image)} alt={`TEPEEYA ${f.name} bottle`} width="600" height="800" loading="lazy" /></div>
        <span className="card-name">{f.name}</span><span className="card-note">{f.note}</span><span className="card-discover">Discover flavour <span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    <div id="flavour-details" className="flavour-details" ref={panel} aria-live="polite" aria-atomic="true">
      <div><span className="eyebrow">YOUR SELECTION</span><h3>{flavour.name}<span> / TEPEEYA</span></h3></div><p>{flavour.text}</p><span className="availability">Collection preview<br /><small>Availability to be announced</small></span>
    </div>
    <dialog ref={dialog} id="flavour-dialog" className="flavour-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onKeyDown={containFocus} onClose={() => { setDetailsOpen(false); opener.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === dialog.current) { const box = dialog.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDetails(); } }}>
      <button autoFocus className="dialog-close" onClick={closeDetails} aria-label="Close flavour details">×</button>
      <div className="dialog-layout">
        <div className={`dialog-photo ${flavour.id}`}><img src={asset(flavour.image)} alt={`TEPEEYA ${flavour.name} bottle`} width="600" height="800" /><span className="dialog-photo-caption">{flavour.note}</span></div>
        <div className="dialog-copy">
          <div className="brand-wordmark dialog-wordmark"><img src={asset('wordmark.webp')} alt="TEPEEYA Tepache" width="930" height="436" /></div>
          <p className="eyebrow">EXPLORE THE FLAVOUR</p><h2 id="dialog-title">{flavour.name}</h2><p id="dialog-description">{flavour.text}</p>
          <ul className="flavour-notes" aria-label="Flavour notes">{flavour.profile.map(note => <li key={note}>{note}</li>)}</ul>
          <div className="dialog-section"><h3>In the bottle</h3><p>{flavour.ingredients.join(' · ')}</p></div>
          <div className="dialog-section"><h3>The moment</h3><p>Serve chilled. Pour into your favourite glass, take a moment, and enjoy.</p></div>
          {selected === 'classic' && <div className="dialog-section"><h3>Classic · {classic.size}</h3><p>{classic.storage}</p><a className="text-link" href={asset('classic-label.webp')} target="_blank" rel="noreferrer">View Classic label ↗</a></div>}
          <p className="dialog-availability">Availability to be announced</p>
        </div>
      </div>
    </dialog>
    <div className="classic-info"><div><p className="eyebrow">A CLOSER LOOK AT CLASSIC</p><h3>Simple ingredients.<br /><em>Distinct character.</em></h3><p className="label-note">Product details from our Classic label.</p></div><div className="label-details"><dl><div><dt>IN THE BOTTLE</dt><dd>{classic.ingredients.join(' · ')}</dd></div><div><dt>BOTTLE SIZE</dt><dd>{classic.size}</dd></div><div><dt>KEEP IT CHILLED</dt><dd>{classic.storage}</dd></div></dl><a className="text-link" href={asset('classic-label.webp')} target="_blank" rel="noreferrer">View the Classic label <span aria-hidden="true">↗</span></a></div></div>
  </section>;
}

function App() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const root = useRef(null);
  const heroRef = useRef(null);
  const motionOff = reduced || paused;
  useEffect(() => { document.documentElement.style.scrollBehavior = motionOff ? 'auto' : ''; return () => { document.documentElement.style.scrollBehavior = ''; }; }, [motionOff]);
  useLayoutEffect(() => {
    if (motionOff) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 26, opacity: 0, stagger: .13, duration: 1.05, ease: 'power2.out', delay: .15 });
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 32, opacity: 0, duration: .9, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
    }, root);
    return () => ctx.revert();
  }, [motionOff]);
  useEffect(() => { const close = e => { if (e.key === 'Escape') setMenu(false); }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);
  return <div ref={root} className={motionOff ? 'motion-off' : ''}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header><a className="brand-wordmark" href="#" aria-label="TEPEEYA Tepache home"><img src={asset('wordmark.webp')} alt="TEPEEYA Tepache" width="930" height="436" /></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation"><a href="#origins" onClick={() => setMenu(false)}>The story</a><a href="#experience" onClick={() => setMenu(false)}>The feeling</a><a className="nav-collection" href="#flavours" onClick={() => setMenu(false)}>Discover flavours <span aria-hidden="true">↗</span></a></nav></header>
    <main id="main">
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <Film name="hero" poster="hero-poster.webp" hero label="TEPEEYA bottle reveal" triggerRef={heroRef} motionOff={motionOff} />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="brand-tagline" lang="es">Un Fermento Mexicano</p><h1 id="hero-title">A Tropical<br />Tradition.<br /><em>Reimagined.</em></h1><p>A little wild. A little golden.<br />A whole new way to slow down.</p><a className="button" href="#origins">Discover TEPEEYA <span aria-hidden="true">↗</span></a></div>
        <div className="hero-bottom"><span>ROOTED IN TRADITION.<br />POURED FOR TODAY.</span><a href="#origins">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="intro"><span className="eyebrow">THIS IS TEPACHE</span><div className="reveal"><h2>Long before cola,<br />there was <em>tepache.</em></h2><p>A naturally fermented pineapple drink from Mexico.<br />Tangy-sweet. Lightly fizzy. Refreshingly different.</p></div><img className="intro-photo" src={asset('bottle.webp')} width="1356" height="1160" loading="lazy" alt="The original TEPEEYA pineapple bottle" /></section>
      <Chapter id="origins" number="01" title="It starts with" italic="a pineapple." caption="THE ORIGIN" body="A tropical fruit. An enduring tradition. Tepache begins with pineapple, transformed through fermentation. TEPEEYA brings that story into a new moment." name="origins" poster="origins-poster.webp" motionOff={motionOff}><span className="chapter-footnote">Our Classic recipe pairs pineapple with cinnamon and cloves.</span></Chapter>
      <section className="interlude"><span className="eyebrow">SLOW DOWN. LOOK CLOSER.</span><p className="reveal">Some moments<br />are better <em>golden.</em></p></section>
      <Chapter id="experience" number="02" title="A feeling," italic="bottled." caption="THE EXPERIENCE" body="The golden glow. The cool of the glass. The delicate rise of bubbles. A little invitation to pause, pour, and be here." name="sensory" poster="sensory-poster.webp" motionOff={motionOff}><div className="sensory-notes"><span>01 · GOLDEN</span><span>02 · CHILLED</span><span>03 · EFFERVESCENT</span></div></Chapter>
      <Collection motionOff={motionOff} />
      <section className="closing"><img src={asset('lineup.webp')} width="1672" height="941" loading="lazy" alt="The five TEPEEYA flavours together: Classic, Mango, Spicy, OG and Honey" /><div><p className="eyebrow">A LITTLE TROPICAL. ENTIRELY TEPEEYA.</p><h2>Make room<br />for <em>golden moments.</em></h2><a className="text-link" href="#flavours">Explore the collection <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer><div className="footer-top"><div><img className="footer-logo" src={asset('brand-logo.webp')} width="1000" height="1000" loading="lazy" alt="TEPEEYA brand emblem" /><p className="brand-tagline" lang="es">Un Fermento Mexicano</p></div><div><p className="eyebrow">EXPLORE</p><a href="#origins">Our story</a><a href="#experience">The experience</a><a href="#flavours">The collection</a></div><div><p className="eyebrow">SAY HELLO</p><a href={`mailto:${classic.email}`}>{classic.email}</a><p className="maker">{classic.maker}</p></div><div><p className="eyebrow">FOLLOW ALONG</p><span className="social-placeholder" aria-disabled="true">Instagram ↗<small>Link coming soon</small></span><span className="social-placeholder" aria-disabled="true">Facebook ↗<small>Link coming soon</small></span></div></div><div className="footer-signature"><div className="brand-wordmark"><img src={asset('wordmark.webp')} width="930" height="436" alt="TEPEEYA Tepache" /></div><p className="brand-tagline" lang="es">Un Fermento Mexicano</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TEPEEYA</span><span>TEPACHE · KERALA, INDIA</span><button onClick={() => setPaused(!paused)} aria-pressed={motionOff} disabled={reduced}>{reduced ? 'Reduced motion enabled' : paused ? 'Enable motion' : 'Pause motion'}</button></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);

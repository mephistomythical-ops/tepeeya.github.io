import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// A small SVG follows measured layout anchors, with no canvas loop or particle engine.
export default function LiquidFlow({ motionOff }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const svg = ref.current, main = svg.parentElement;
    const paths = [...svg.querySelectorAll('path')];
    const tip = svg.querySelector('circle');
    const glass = main.querySelector('.pour-glass');
    let animation, frame;
    function layout() {
      cancelAnimationFrame(frame);
      animation?.kill(); animation?.scrollTrigger?.kill();
      const rect = main.getBoundingClientRect(), width = main.clientWidth;
      const relative = el => { const r = el.getBoundingClientRect(); return { x: r.left - rect.left, y: r.top - rect.top, w: r.width, h: r.height }; };
      const hero = relative(main.querySelector('.hero .film'));
      const end = relative(glass);
      const mobile = width < 768;
      const gutter = mobile ? 9 : 22;
      const startX = hero.x + hero.w * .29;
      const startY = hero.y + hero.h * .15;
      const points = [{ x: startX, y: startY }, { x: gutter, y: hero.y + hero.h * .85 }];
      for (const selector of ['.intro', '#origins', '.interlude', '#experience', '#flavours', '#refreshment']) {
        const s = relative(main.querySelector(selector));
        points.push({ x: gutter + (mobile ? 2 : 10), y: s.y + 22 }, { x: gutter, y: s.y + s.h * .6 });
      }
      // Stay outside copy and cards; cross only the dedicated glass landing area.
      const mouth = { x: end.x + end.w / 2, y: end.y + end.h * 34 / 210 };
      const landing = relative(main.querySelector('.pour-landing'));
      const ordered = points.filter(p => p.y < landing.y - 25);
      let d = `M ${ordered[0].x} ${ordered[0].y}`;
      for (let i = 1; i < ordered.length; i++) {
        const a = ordered[i - 1], b = ordered[i], mid = (a.y + b.y) / 2;
        d += ` C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}`;
      }
      const last = ordered[ordered.length - 1];
      d += ` C ${last.x} ${landing.y}, ${mouth.x} ${landing.y - 50}, ${mouth.x} ${mouth.y}`;
      svg.setAttribute('viewBox', `0 0 ${width} ${main.clientHeight}`);
      svg.style.height = `${main.clientHeight}px`;
      paths.forEach(path => path.setAttribute('d', d));
      const length = paths[0].getTotalLength();
      const fill = glass.querySelector('.glass-fill'), bubbles = glass.querySelector('.glass-bubbles'), splash = glass.querySelector('.glass-splash');
      gsap.set(fill, { transformOrigin: '50% 100%' });
      const state = { progress: motionOff ? 1 : 0 };
      const paint = () => {
        const p = state.progress;
        paths.forEach(path => { path.style.strokeDasharray = `${length}`; path.style.strokeDashoffset = `${length * (1 - p)}`; });
        const pos = paths[0].getPointAtLength(length * p);
        tip.setAttribute('cx', pos.x); tip.setAttribute('cy', pos.y);
        tip.style.opacity = motionOff || p < .002 || p > .998 ? 0 : .85;
        const arrival = Math.max(0, Math.min(1, 1 - length * (1 - p) / 55));
        gsap.set(fill, { scaleY: motionOff ? 1 : .06 + arrival * .94 });
        gsap.set(bubbles, { opacity: motionOff ? .5 : arrival, y: motionOff ? 0 : (1 - arrival) * 15 });
        gsap.set(splash, { opacity: motionOff ? 0 : Math.sin(arrival * Math.PI), y: -arrival * 4 });
      };
      paint();
      if (!motionOff) animation = gsap.to(state, { progress: 1, ease: 'none', onUpdate: paint, scrollTrigger: { trigger: main, start: 'top top', endTrigger: glass, end: 'top 55%', scrub: .55, invalidateOnRefresh: true } });
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(layout); };
    const observer = new ResizeObserver(schedule);
    observer.observe(main);
    ScrollTrigger.addEventListener('refreshInit', schedule);
    layout();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); animation?.scrollTrigger?.kill(); animation?.kill(); ScrollTrigger.removeEventListener('refreshInit', schedule); };
  }, [motionOff]);
  return <svg ref={ref} className={`liquid-flow ${motionOff ? 'liquid-flow-still' : ''}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
    <defs><linearGradient id="tepache-stream" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#c48e36" stopOpacity=".28"/><stop offset=".5" stopColor="#f4d88a" stopOpacity=".7"/><stop offset="1" stopColor="#af7726" stopOpacity=".28"/></linearGradient></defs>
    <path className="liquid-halo" fill="none" stroke="#e4ba5f" strokeWidth="17" opacity=".09" strokeLinecap="round"/>
    <path className="liquid-thread" fill="none" stroke="url(#tepache-stream)" strokeWidth="4" strokeLinecap="round"/>
    <circle r="3" fill="#e4bd65" opacity="0"/>
  </svg>;
}

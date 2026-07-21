'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/paths';

const ACCENT = '#00f0ff';
const ACCENT_RGB = '0, 240, 255';
const PULSE = '#ff2ec4';
const PULSE_RGB = '255, 46, 196';

interface Stop {
  name: string;
  city: string;
  lat: number;
  lng: number;
  year: string;
  span: string;
  role: string;
  blurb: string;
  href: string;
  cta: string;
}

const STOPS: Stop[] = [
  {
    name: 'Taiwan',
    city: 'Tainan',
    lat: 22.9997,
    lng: 120.227,
    year: 'ORIGIN',
    span: 'Home base',
    role: 'Where it started',
    blurb:
      'Born and raised in Taiwan — and still where the work happens. Project and product roles at GOSTUDY and Jobwise, building an AI document engine and a self-service platform for a 500+ student programme.',
    href: '/#experience',
    cta: 'See the work →',
  },
  {
    name: 'United Kingdom',
    city: 'Horsham → London',
    lat: 51.5074,
    lng: -0.1278,
    year: '2018',
    span: '2018 – 2024',
    role: 'A-Levels → BSc (Eng) Creative Computing',
    blurb:
      'Six years in England: A-Levels in Maths, Computer Science, Physics and Economics at The College of Richard Collyer, then a BSc (Eng) in Creative Computing at Queen Mary University of London.',
    href: '/#education',
    cta: 'See the coursework →',
  },
  {
    name: 'Netherlands',
    city: 'Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    year: '2026',
    span: 'From Sep 2026',
    role: 'MSc Business Information Technology Management',
    blurb:
      'Next stop Amsterdam — an MSc at the University of Amsterdam covering digital transformation, data science and AI for business.',
    href: '/#education',
    cta: "See what's next →",
  },
];

const ARCS = [
  { startLat: STOPS[0].lat, startLng: STOPS[0].lng, endLat: STOPS[1].lat, endLng: STOPS[1].lng },
  { startLat: STOPS[1].lat, startLng: STOPS[1].lng, endLat: STOPS[2].lat, endLng: STOPS[2].lng },
];

/** Re-applies the per-stop emphasis (bigger dot, faster pulse on the active stop). */
function applyStyles(globe: any, activeIdx: number) {
  const act = STOPS[activeIdx];
  globe
    .hexPolygonColor(() => `rgba(${ACCENT_RGB}, 0.10)`)
    .pathColor(() => `rgba(${ACCENT_RGB}, 0.55)`)
    .atmosphereColor(ACCENT)
    .pointColor(() => PULSE)
    .pointRadius((d: Stop) => (d === act ? 0.75 : 0.42))
    .ringColor(() => (t: number) => `rgba(${PULSE_RGB}, ${1 - t})`)
    .ringMaxRadius((d: Stop) => (d === act ? 7 : 3.6))
    .ringRepeatPeriod((d: Stop) => (d === act ? 650 : 1500))
    .arcColor(() => `rgba(${ACCENT_RGB}, 0.7)`);
}

export default function Journey() {
  const mount = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let cancelled = false;
    let onResize: (() => void) | null = null;
    let observer: ResizeObserver | null = null;
    let onGrab: (() => void) | null = null;
    let onRelease: (() => void) | null = null;

    (async () => {
      const [{ default: Globe }, countries, land] = await Promise.all([
        import('globe.gl'),
        fetch(withBase('/data/countries.geojson')).then((r) => r.json()),
        fetch(withBase('/data/land.geojson')).then((r) => r.json()),
      ]);
      if (cancelled || !mount.current) return;

      // Dissolved coastline rings — land outlines only, no country borders.
      const coastlines: number[][][] = [];
      land.features.forEach((f: any) => {
        const geom = f.geometry;
        if (!geom) return;
        const polys =
          geom.type === 'Polygon'
            ? [geom.coordinates]
            : geom.type === 'MultiPolygon'
              ? geom.coordinates
              : [];
        polys.forEach((poly: number[][][]) => poly.forEach((ring) => coastlines.push(ring)));
      });

      const globe = new Globe(el, { rendererConfig: { antialias: true, alpha: true } })
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereAltitude(0.16)
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.4)
        .hexPolygonUseDots(true)
        .hexPolygonAltitude(0.004)
        .pathsData(coastlines)
        .pathPointLat((p: number[]) => p[1])
        .pathPointLng((p: number[]) => p[0])
        .pathPointAlt(0.007)
        .pathStroke(1.2)
        .pathTransitionDuration(0)
        .ringsData(STOPS)
        .ringPropagationSpeed(3)
        .pointsData(STOPS)
        .pointAltitude(0.02)
        .pointResolution(24)
        .arcsData(ARCS)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcStroke(0.55)
        .arcAltitudeAutoScale(0.4)
        .arcDashLength(0.45)
        .arcDashGap(0.25)
        .arcDashAnimateTime(2600);

      globeRef.current = globe;
      applyStyles(globe, 0);

      const material = globe.globeMaterial();
      material.color.set('#060d18');
      material.emissive.set('#0a1c2e');
      material.emissiveIntensity = 0.4;
      material.shininess = 0.4;

      const controls = globe.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.rotateSpeed = 0.6;

      globe.pointOfView({ lat: STOPS[0].lat, lng: STOPS[0].lng, altitude: 2.0 }, 0);

      onGrab = () => el.classList.add('cursor-grabbing');
      onRelease = () => el.classList.remove('cursor-grabbing');
      el.addEventListener('pointerdown', onGrab);
      window.addEventListener('pointerup', onRelease);

      onResize = () => {
        const box = mount.current;
        if (!box) return;
        globe.width(box.clientWidth).height(box.clientHeight);
      };
      onResize();
      window.addEventListener('resize', onResize);
      observer = new ResizeObserver(onResize);
      observer.observe(el);

      setReady(true);
    })().catch((err) => {
      console.error('[Journey] globe failed to initialise', err);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (onResize) window.removeEventListener('resize', onResize);
      if (onGrab) el.removeEventListener('pointerdown', onGrab);
      if (onRelease) window.removeEventListener('pointerup', onRelease);
      const globe = globeRef.current;
      if (globe) {
        // Release the WebGL context so remounts don't leak one per mount.
        globe._destructor?.();
        const renderer = globe.renderer?.();
        renderer?.forceContextLoss?.();
        renderer?.dispose?.();
        globeRef.current = null;
      }
      el.innerHTML = '';
    };
  }, []);

  // Fly to the selected stop and re-emphasise its marker.
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;
    applyStyles(globe, activeIdx);
    const stop = STOPS[activeIdx];
    globe.pointOfView({ lat: stop.lat, lng: stop.lng, altitude: 2.0 }, 1200);
  }, [activeIdx, ready]);

  const active = STOPS[activeIdx];

  return (
    <section
      id="journey"
      className="relative h-screen min-h-[640px] w-full overflow-hidden border-t border-line bg-[radial-gradient(circle_at_50%_42%,#0a1424_0%,#05050a_58%,#02030a_100%)]"
    >
      <div
        ref={mount}
        className={`absolute inset-0 cursor-grab transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Left rail: heading + clickable timeline */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex max-w-[min(85vw,440px)] flex-col justify-between gap-7 px-7 pb-16 pt-24 sm:px-10 md:max-w-[min(42vw,440px)] md:pb-20">
        <div>
          <p className="kicker">life &amp; tech adventure</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Three countries,
            <br />
            one path.
          </h2>
          <div className="mt-5 h-[3px] w-[52px] bg-neon-cyan shadow-glow-cyan" />
        </div>

        <ol className="pointer-events-auto flex flex-col">
          {STOPS.map((stop, i) => {
            const on = i === activeIdx;
            return (
              <li key={stop.name}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-current={on ? 'step' : undefined}
                  className={`flex w-full gap-3.5 text-left transition-opacity duration-300 ${
                    on ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="flex flex-none flex-col items-center">
                    <span
                      className={`mt-[3px] h-3 w-3 flex-none rounded-full border-2 border-neon-cyan transition-all duration-300 ${
                        on ? 'bg-neon-cyan shadow-glow-cyan' : 'bg-transparent'
                      }`}
                    />
                    {i < STOPS.length - 1 && (
                      <span className="mt-1 h-[30px] w-[2px] bg-neon-cyan/30" />
                    )}
                  </span>
                  <span className="block pb-5">
                    <span
                      className={`block font-mono text-[11px] tracking-[2px] ${
                        on ? 'text-neon-cyan' : 'text-ink-faint'
                      }`}
                    >
                      {stop.year}
                    </span>
                    <span
                      className={`mt-0.5 block font-display text-[17px] font-semibold transition-colors ${
                        on ? 'text-ink' : 'text-ink-dim'
                      }`}
                    >
                      {stop.name}
                    </span>
                    <span className="block text-xs text-ink-dim">{stop.city}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail card */}
      <div
        key={active.name}
        className="glass absolute bottom-14 right-5 z-10 w-[min(80vw,300px)] max-h-[calc(100%-7rem)] overflow-y-auto rounded-2xl p-5 shadow-glow-cyan animate-fade-up md:bottom-10 md:right-8"
      >
        <p className="font-mono text-xs tracking-widest text-ink-dim">{active.span}</p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{active.name}</h3>
        <p className="mt-1.5 font-mono text-[13px] tracking-[2px] text-neon-cyan">{active.city}</p>
        <div className="my-4 h-px bg-line" />
        <p className="font-display text-base font-semibold leading-snug">{active.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{active.blurb}</p>
        <Link href={active.href} className="neon-chip mt-4 inline-flex hover:shadow-glow-cyan">
          {active.cta}
        </Link>
      </div>

      <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[2px] text-ink-faint">
        Drag to explore
      </p>
    </section>
  );
}

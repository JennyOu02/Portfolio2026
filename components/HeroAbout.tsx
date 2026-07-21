"use client";

import Link from "next/link";
import { useState } from "react";
import { withBase } from "@/lib/paths";

/** "neon" tone from the source design. */
const P = {
  accent: "#35e6d4",
  win: "#080b14",
  outer: "#0a0d16",
  text: "#eaf6ff",
  sub: "rgba(198,222,236,0.6)",
  faint: "rgba(150,175,195,0.42)",
  card: "rgba(255,255,255,0.035)",
  line: "rgba(255,255,255,0.08)",
};

/** One accent + glyph per industrial project, in card order. */
const PROOF_COLOURS = ["#ffcf4d", "#4da6ff", "#3ee88f"];
const PROOF_GLYPHS = ["◆", "✦", "▲"];

const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** The hero strip wants years, not months: "Sep 2021 – Jul 2024" reads as "2021 – 2024". */
function yearsOnly(period: string) {
  const years = period.match(/\d{4}/g);
  if (!years) return period;
  if (years.length > 1) return `${years[0]} – ${years[years.length - 1]}`;
  // A single year keeps whatever qualifies it — "From Sep 2026" → "From 2026".
  return /^from\b/i.test(period) ? `From ${years[0]}` : years[0];
}

const MONO = "var(--font-space-mono), monospace";
const GROTESK = "var(--font-display), sans-serif";

/** Section titles (SKILLS / EDUCATION / INDUSTRIAL PROJECTS) share one scale. */
const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontFamily: GROTESK,
  fontWeight: 700,
  fontSize: "clamp(17px,1.6vw,22px)",
  letterSpacing: "0.5px",
  color: P.text,
};

const frameShell: React.CSSProperties = {
  background: `radial-gradient(120% 90% at 50% 0%, #161a17 0%, ${P.win} 55%)`,
  boxShadow: `inset 0 0 0 1.5px ${rgba(P.accent, 0.5)}, inset 0 1px 0 rgba(255,255,255,0.06), 0 0 30px ${rgba(P.accent, 0.22)}, 0 40px 90px rgba(0,0,0,0.55)`,
  border: `1px solid ${rgba(P.accent, 0.6)}`,
  color: P.text,
};

/** A labelled proficiency bar — the segmented "LED" track from the source design. */
function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <span
        style={{
          flex: "0 0 auto",
          width: "clamp(118px,11vw,152px)",
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.5px",
          color: P.sub,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <span
        style={{
          position: "relative",
          flex: "1 1 auto",
          height: 8,
          borderRadius: 3,
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${level}%`,
            background: P.accent,
            boxShadow: `0 0 8px ${rgba(P.accent, 0.5)}`,
          }}
        />
        {/* the notches that break the fill into segments */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(90deg, transparent 0 calc(7% - 2px), ${P.win} calc(7% - 2px) 7%)`,
          }}
        />
      </span>
    </div>
  );
}

/**
 * One industrial project as a card: a coloured glyph, the question it answers, the
 * project it came from, and the number it moved. Links to the case study.
 */
function ProjectCard({
  colour,
  glyph,
  question,
  source,
  value,
  label,
  href,
}: {
  colour: string;
  glyph: string;
  question: string;
  source?: string;
  value: string;
  label: string;
  href?: string;
}) {
  const body = (
    <>
      <span
        style={{
          flex: "0 0 auto",
          width: 44,
          height: 44,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          color: "#0e100e",
          background: `linear-gradient(140deg, ${colour}, ${rgba(colour, 0.7)})`,
          boxShadow: `0 0 16px ${rgba(colour, 0.4)}`,
        }}
      >
        {glyph}
      </span>
      <span
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: GROTESK,
            fontWeight: 600,
            fontSize: "clamp(13.5px,1.15vw,15.5px)",
            lineHeight: 1.3,
            color: P.text,
            textWrap: "pretty",
          }}
        >
          {question}
        </span>
        {source && (
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.5px",
              color: rgba(P.text, 0.32),
            }}
          >
            {source}
          </span>
        )}
      </span>
      <span
        style={{
          flex: "0 0 auto",
          width: 76,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        <span
          style={{
            fontFamily: GROTESK,
            fontWeight: 700,
            fontSize: "clamp(24px,2.2vw,30px)",
            lineHeight: 1,
            color: colour,
            textShadow: `0 0 18px ${rgba(colour, 0.5)}`,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: "0.4px",
            color: P.faint,
            lineHeight: 1.3,
            textAlign: "right",
          }}
        >
          {label}
        </span>
      </span>
    </>
  );

  const style: React.CSSProperties = {
    ["--c" as string]: colour,
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "15px 16px",
    borderRadius: 14,
    background: `linear-gradient(90deg, ${rgba(colour, 0.09)}, transparent 45%), ${P.card}`,
    border: `1px solid ${P.line}`,
    borderLeft: `3px solid ${colour}`,
    textDecoration: "none",
    minWidth: 0,
  };

  return href ? (
    <Link href={href} className="hero-tile" style={style}>
      {body}
    </Link>
  ) : (
    <div style={style}>{body}</div>
  );
}

export interface HeroProof {
  value: string;
  label: string;
  note?: string;
  slug?: string;
  /** The question the project answers — headlines the card. */
  question?: string;
  /** Title of the case study the number came from, resolved from `slug`. */
  source?: string;
  /** Client the project was delivered for, resolved from `slug`. */
  org?: string;
}

export interface HeroEducation {
  school: string;
  degree: string;
  period: string;
  image: string;
  imageBg?: "white";
}

interface HeroAboutProps {
  kicker: string;
  tagline: string;
  about: string[];
  email: string;
  linkedin: string;
  github: string;
  portrait: string;
  proof: HeroProof[];
  education: HeroEducation[];
  skills: { label: string; level: number }[];
}

export default function HeroAbout({
  kicker,
  tagline,
  about,
  email,
  linkedin,
  github,
  portrait,
  proof,
  education,
  skills,
}: HeroAboutProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding:
          "clamp(60px,10vh,120px) clamp(10px,2vw,24px) clamp(16px,3vh,28px)",
        background: `radial-gradient(circle at 50% 30%, #202322, ${P.outer} 70%)`,
        fontFamily: "var(--font-sora), sans-serif",
      }}
    >
      {/* minWidth:0 — as a flex item it would otherwise refuse to shrink below the
          dashboard's min-content width and push the page into sideways scroll. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minWidth: 0,
          maxWidth: 1300,
          perspective: 2000,
        }}
      >
        {/*
          Flip stage. Both faces share one grid cell. The height is fixed rather than a
          minimum, so neither face's content can stretch the card — it always shows at
          the same size. (Below 900px the stacked layout releases it; see globals.css.)
        */}
        <div
          className="hero-stage-frame"
          style={{
            position: "relative",
            display: "grid",
            width: "100%",
            height: "max(520px, min(740px, calc(100vh - 140px)))",
            transformStyle: "preserve-3d",
            transition: "transform .8s cubic-bezier(.65,.05,.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ---------- FRONT: dashboard ---------- */}
          <div
            style={{
              gridArea: "1 / 1",
              position: "relative",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            aria-hidden={flipped}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                overflow: "hidden",
                borderRadius: 22,
                ...frameShell,
              }}
            >
              <div
                className="hero-grid"
                style={{
                  flex: "1 1 auto",
                  display: "grid",
                  // Left carries skills + education, right carries the project cards, so
                  // both get a wide share; the centre stays just wide enough to stage the
                  // character without spilling over either side's text.
                  gridTemplateColumns:
                    "minmax(280px,1.08fr) minmax(220px,0.8fr) minmax(350px,1.35fr)",
                  gap: "clamp(16px,2vw,36px)",
                  padding: "clamp(24px,4vh,40px) clamp(22px,2.6vw,44px)",
                  minWidth: 0,
                }}
              >
                {/* LEFT — identity, skills, education */}
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(14px,2vh,20px)",
                    minWidth: 0,
                    animation: "fadeUp .6s .05s both",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: "3px",
                        color: P.accent,
                      }}
                    >
                      {kicker}
                    </p>
                    <h1
                      style={{
                        margin: "8px 0 0",
                        fontFamily: GROTESK,
                        fontWeight: 700,
                        fontSize: "clamp(38px,4.4vw,62px)",
                        lineHeight: 0.92,
                        letterSpacing: "-0.03em",
                        color: P.text,
                      }}
                    >
                      JENNY OU
                    </h1>
                    <div
                      style={{
                        display: "inline-flex",
                        alignSelf: "flex-start",
                        marginTop: 14,
                        alignItems: "center",
                        gap: 7,
                        padding: "7px 13px",
                        borderRadius: 999,
                        background: rgba(P.accent, 0.1),
                        border: `1px solid ${rgba(P.accent, 0.35)}`,
                        fontFamily: MONO,
                        fontSize: 9,
                        letterSpacing: "2px",
                        color: P.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        className="animate-hud-pulse"
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: P.accent,
                          boxShadow: `0 0 8px ${P.accent}`,
                        }}
                      />
                      AVAILABLE FOR WORK
                    </div>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(14px,1.15vw,17px)",
                      lineHeight: 1.5,
                      fontWeight: 300,
                      color: P.sub,
                      maxWidth: 310,
                      textWrap: "pretty",
                    }}
                  >
                    {tagline}
                  </p>

                  {/* skills — proficiency bars */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 11,
                    }}
                  >
                    <p style={sectionHeading}>SKILLS</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 9,
                      }}
                    >
                      {skills.map((s) => (
                        <SkillBar
                          key={s.label}
                          label={s.label}
                          level={s.level}
                        />
                      ))}
                    </div>
                  </div>

                  {/* education */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 11,
                      marginTop: "clamp(4px,1.5vh,14px)",
                    }}
                  >
                    <p style={sectionHeading}>EDUCATION</p>
                    <div
                      className="hero-edu-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {education.map((e) => (
                        <div
                          key={e.school}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{
                              flex: "0 0 auto",
                              width: 44,
                              height: 44,
                              borderRadius: 11,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 5,
                              overflow: "hidden",
                              // Marks drawn for light backgrounds get their own plate.
                              background:
                                e.imageBg === "white"
                                  ? "#fff"
                                  : "rgba(255,255,255,0.06)",
                              border: `1px solid ${rgba(P.accent, 0.22)}`,
                            }}
                          >
                            <img
                              src={withBase(e.image)}
                              alt=""
                              aria-hidden
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </span>
                          <span style={{ minWidth: 0 }}>
                            <span
                              style={{
                                display: "block",
                                fontFamily: GROTESK,
                                fontWeight: 600,
                                fontSize: "clamp(12.5px,0.95vw,14px)",
                                lineHeight: 1.2,
                                color: P.text,
                              }}
                            >
                              {e.school}
                            </span>
                            <span
                              style={{
                                display: "block",
                                marginTop: 4,
                                fontFamily: MONO,
                                fontSize: 9,
                                lineHeight: 1.3,
                                letterSpacing: "0.3px",
                                color: P.faint,
                              }}
                            >
                              {e.degree} · {yearsOnly(e.period)}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* CENTER — stage glow; the character overlays this */}
                <section
                  className="hero-stage"
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    minWidth: 0,
                    overflow: "hidden",
                    animation: "fadeUp .6s .12s both",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      minWidth: 0,
                      minHeight: 0,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "4%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "78%",
                        height: "78%",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${rgba(P.accent, 0.16)}, transparent 66%)`,
                        filter: "blur(6px)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "6%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "68%",
                        height: 46,
                        borderRadius: "50%",
                        background: `radial-gradient(ellipse at center, ${rgba(P.accent, 0.5)}, transparent 66%)`,
                        filter: "blur(7px)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </section>

                {/* RIGHT — the industrial projects, one card each */}
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(12px,1.8vh,18px)",
                    minWidth: 0,
                    paddingBottom: "clamp(30px,5vh,56px)",
                    animation: "fadeUp .6s .18s both",
                  }}
                >
                  <div>
                    <p style={sectionHeading}>INDUSTRIAL PROJECTS</p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontFamily: MONO,
                        fontSize: 8.5,
                        letterSpacing: "2px",
                        color: P.faint,
                      }}
                    >
                      PROVEN OUTCOMES · REAL NUMBERS
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {proof.map((s, i) => (
                      <ProjectCard
                        key={`${s.value}-${s.label}`}
                        colour={PROOF_COLOURS[i % PROOF_COLOURS.length]}
                        glyph={PROOF_GLYPHS[i % PROOF_GLYPHS.length]}
                        question={s.question ?? s.source ?? s.label}
                        source={
                          s.source && s.org
                            ? `${s.source} · ${s.org}`
                            : s.source
                        }
                        value={s.value}
                        label={s.label}
                        href={s.slug ? `/work/${s.slug}` : undefined}
                      />
                    ))}
                  </div>

                  <Link
                    href="/#work"
                    className="hero-tile"
                    style={{
                      ["--c" as string]: P.accent,
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 18px",
                      borderRadius: 999,
                      border: `1px solid ${rgba(P.accent, 0.5)}`,
                      background: rgba(P.accent, 0.05),
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "2px",
                      color: P.text,
                      textDecoration: "none",
                    }}
                  >
                    OPEN ALL WORK →
                  </Link>
                </section>
              </div>
            </div>

            {/* character, breaking out above the frame */}
            <div
              className="hero-character"
              style={{
                position: "absolute",
                bottom: "1.5%",
                left: "50%",
                transform: "translateX(-50%) translate(-2%, 5%) scale(1)",
                transformOrigin: "bottom center",
                // Sized to stay inside the centre column — wider and she covers the
                // project cards' headings.
                width: "min(600px,58vw)",
                height: "calc(100% + clamp(60px,12vh,150px))",
                zIndex: 6,
                pointerEvents: "none",
                opacity: flipped ? 0 : 1,
                transition: "opacity .3s ease",
                filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.5))",
              }}
            >
              <img
                src={withBase("/img/hero-character.png")}
                alt=""
                aria-hidden
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom",
                  transform: "translateX(-50px)",
                }}
              />
            </div>
          </div>

          {/* ---------- BACK: about ---------- */}
          <div
            style={{
              gridArea: "1 / 1",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: 22,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // Extra room at the foot keeps the copy clear of the flip button.
              padding:
                "clamp(28px,4vh,56px) clamp(24px,4vw,64px) clamp(56px,7vh,88px)",
              ...frameShell,
            }}
            aria-hidden={!flipped}
          >
            <div
              className="hero-about"
              style={{
                width: "100%",
                maxWidth: 1060,
                display: "grid",
                // Portrait anchors the left; heading, copy and links read as one stack.
                gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.85fr)",
                gap: "clamp(26px,3.6vw,56px)",
                alignItems: "center",
              }}
            >
              {/* portrait */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 320,
                  justifySelf: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -5,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${P.accent}, #ff3fa4)`,
                    opacity: 0.4,
                    filter: "blur(12px)",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    aspectRatio: "3 / 4",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${rgba(P.accent, 0.3)}`,
                  }}
                >
                  <img
                    src={withBase(portrait)}
                    alt="Jenny Ou"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              {/* copy */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(13px,1.9vh,20px)",
                  minWidth: 0,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "3px",
                      color: P.accent,
                    }}
                  >
                    <span style={{ color: P.faint }}>01 //</span> ABOUT
                  </p>
                  <h2
                    style={{
                      margin: "2px 0 0",
                      fontFamily: GROTESK,
                      fontWeight: 700,
                      fontSize: "clamp(24px,3vw,34px)",
                      color: P.text,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Who I am
                  </h2>
                  <div
                    style={{
                      height: 2,
                      width: 84,
                      marginTop: 14,
                      background: `linear-gradient(90deg, ${P.accent}, #ff3fa4)`,
                      boxShadow: `0 0 12px ${rgba(P.accent, 0.4)}`,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(10px,1.4vh,15px)",
                    // Keeps the line length readable when the card is at full width.
                    maxWidth: "64ch",
                  }}
                >
                  {about.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        margin: 0,
                        fontSize: "clamp(13px,1vw,15px)",
                        lineHeight: 1.65,
                        color: P.sub,
                        fontWeight: 300,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { label: "EMAIL", href: `mailto:${email}`, ext: false },
                    { label: "LINKEDIN", href: linkedin, ext: true },
                    { label: "GITHUB", href: github, ext: true },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(l.ext
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      style={{
                        padding: "9px 16px",
                        borderRadius: 999,
                        background: rgba(P.accent, 0.06),
                        border: `1px solid ${rgba(P.accent, 0.4)}`,
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "2px",
                        color: P.text,
                        textDecoration: "none",
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* flip toggle — the halo is the only cue that the card has a second side */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 18,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            type="button"
            className="hero-flip"
            data-idle
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "5px 16px 5px 5px",
              borderRadius: 999,
              border: "1px solid transparent",
              // Double background: dark fill inside, gradient on the border ring.
              background: `linear-gradient(${P.win}, ${P.win}) padding-box,
                linear-gradient(115deg, ${P.accent}, #b57bff 45%, #ff3fa4 75%, #ffb057) border-box`,
              color: P.text,
              backdropFilter: "blur(6px)",
            }}
          >
            <img
              src={withBase(portrait)}
              alt=""
              aria-hidden
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                objectFit: "cover",
                border: `1px solid ${rgba(P.accent, 0.5)}`,
              }}
            />
            <span
              style={{
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: 13.5,
                letterSpacing: "1.5px",
                lineHeight: 1.2,
              }}
            >
              {flipped ? "DASHBOARD" : "ABOUT ME"}
            </span>
            <span
              className="hero-flip-arrow"
              style={{ fontSize: 15, color: P.accent, lineHeight: 1 }}
            >
              ⇋
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

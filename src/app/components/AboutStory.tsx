import { useRef } from "react";
import { useInView } from "motion/react";
import { SafeSpline } from "./SafeSpline";

// 4.8 MB scene, loaded only when the section is near the viewport
const SCENE_URL = "https://prod.spline.design/ZsCPeDg1bLs1XJgs/scene.splinecode";
// Camera zoom applied on load; raise to make the scene bigger in its box
const SCENE_ZOOM = 1.4;

// A paragraph is a list of pieces: plain text, or linked text
type Piece = string | { text: string; href: string };

// "scene" marks where the full-width 3D scene sits between paragraphs
const BLOCKS: (Piece[] | "scene")[] = [
  ["Over the years, I’ve worked as the sole designer for startups, worked with larger companies, and found myself wearing just about every design hat you can think of."],
  "scene",
  [
    "UX, UI, web, branding, marketing, print, illustration, whatever the project needs (I even designed ",
    { text: "car wraps", href: "" }, // TODO: add link
    ", ",
    { text: "building signs", href: "" }, // TODO: add link
    ", and ",
    { text: "a zamboni", href: "" }, // TODO: add link
    "!). I like being the person who can jump into something new, figure it out, and make it happen.",
  ],
  ["I think that comes from being curious more than anything. I like learning how things work, picking up new tools, and seeing what I can make with them. I don’t necessarily need to already know how to do something before I try it."],
  ["Outside of design, I’m usually doing something equally random. I grew up on Long Island and eventually made my way into Brooklyn. I spend a lot of time exploring the city, going to shows, listening to way too much techno and drum & bass."],
  ["These days, I’m still doing what I’ve always done: making things, learning things, and occasionally starting a project just because I thought it would be cool."],
];

const TEXT_COLUMN = "w-full max-w-2xl mx-auto";
const LINK_CLASS = "text-white underline underline-offset-4 decoration-[#666] hover:decoration-white transition-colors";

// Personal intro shown below "What I do" on the About tab
export function AboutStory() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneNearby = useInView(sceneRef, { once: true, margin: "300px" });

  return (
    <section className="w-full max-w-[1100px] mx-auto px-2 sm:px-4 flex flex-col gap-6">
      <h2 className={`${TEXT_COLUMN} text-white text-3xl sm:text-4xl font-semibold text-center leading-tight mb-4`}>
        I’ve always liked doing<br />a bit of everything.
      </h2>

      {BLOCKS.map((block, i) =>
        block === "scene" ? (
          // Spans the full section width. The canvas is absolutely positioned so it can't
          // resize the layout, and wheel/touch scrolling over it scrolls the page instead
          <div
            key={i}
            ref={sceneRef}
            className="relative w-full h-[400px] sm:h-[620px] my-6 rounded-2xl overflow-hidden [&_canvas]:touch-pan-y"
            onWheelCapture={e => e.stopPropagation()}
          >
            {sceneNearby && (
              <div className="absolute inset-0">
                <SafeSpline scene={SCENE_URL} zoom={SCENE_ZOOM} sharp />
              </div>
            )}
          </div>
        ) : (
          <p key={i} className={`${TEXT_COLUMN} text-[#d7d7d7] text-lg leading-relaxed`}>
            {block.map((piece, j) =>
              typeof piece === "string" ? (
                piece
              ) : piece.href ? (
                <a key={j} href={piece.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  {piece.text}
                </a>
              ) : (
                // Styled like a link until its URL is added
                <span key={j} className={LINK_CLASS}>{piece.text}</span>
              )
            )}
          </p>
        )
      )}
    </section>
  );
}

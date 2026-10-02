// A paragraph is a list of pieces: plain text, or linked text
type Piece = string | { text: string; href: string };

const PARAGRAPHS: Piece[][] = [
  ["I graduated in 2020 from SUNY Oswego with a graphic design degree, but I’ve never really been interested in putting myself into one box."],
  [
    "Over the years, I’ve worked as the sole designer for startups, worked with larger companies, and found myself wearing just about every design hat you can think of. UX, UI, web, branding, marketing, print, illustration, whatever the project needs (I even designed ",
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

const LINK_CLASS = "text-white underline underline-offset-4 decoration-[#666] hover:decoration-white transition-colors";

// Personal intro shown below "What I do" on the About tab
export function AboutStory() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-10">
      <h2 className="text-white text-3xl sm:text-4xl font-semibold md:pl-20">Oh, hi.</h2>
      <div className="space-y-6">
        {PARAGRAPHS.map((pieces, i) => (
          <p key={i} className="text-[#d7d7d7] text-lg leading-relaxed">
            {pieces.map((piece, j) =>
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
        ))}
      </div>
    </section>
  );
}

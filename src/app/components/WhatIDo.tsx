const SKILLS = [
  {
    title: "Product Design",
    description: "UX/UI design, product strategy, prototyping, ready-to-ship",
    tools: ["Figma"],
  },
  {
    title: "Graphic Design",
    description: "Branding, packaging, and visual identity",
    tools: ["Photoshop", "Illustrator", "InDesign"],
  },
  {
    title: "Development",
    description: "Web design, app design, coding background",
    tools: ["HTML/CSS", "AI Tools", "3D Tools"],
  },
];

// Shown below the window while the About tab is open
export function WhatIDo() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-2 sm:px-4 text-center">
      <h2 className="text-white text-3xl sm:text-4xl font-semibold">What I do</h2>
      <p className="text-[#d7d7d7] text-base mt-3 max-w-xs mx-auto">
        Multidisciplinary designer with a variety of design skills
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
        {SKILLS.map(skill => (
          <div key={skill.title} className="bg-[#232426] rounded-2xl p-6 sm:p-7 flex flex-col">
            <h3 className="text-white text-lg font-semibold">{skill.title}</h3>
            <p className="text-[#d7d7d7] text-base leading-snug mt-3">{skill.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {skill.tools.map(tool => (
                <span key={tool} className="text-xs px-3 py-1 border border-[#444] rounded-full text-[#aaa]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

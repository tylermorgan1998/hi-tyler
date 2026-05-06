import { memo } from 'react';
import Spline from '@splinetool/react-spline@4.0.0';
import profileImage from 'figma:asset/146c8897395bc3e0c534fe834180dfb06ceb920f.png';

const SplineScene = memo(() => (
  <Spline scene="https://prod.spline.design/wfqKABbgD1Bkluti/scene.splinecode" />
));

export function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 sm:space-y-16 py-8">
      {/* Hero section - Design philosophy with image */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-8 sm:gap-10 lg:gap-12 items-center">
        <div className="flex justify-center w-48 sm:w-64 md:w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden">
          <SplineScene />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl">
            Design lead based in New York
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I believe great design is about more than aesthetics—it's about <span className="text-[#ec4899]">solving problems</span> and creating meaningful experiences. My approach is rooted in understanding users, embracing simplicity, and pushing the boundaries of innovation.
          </p>
        </div>
      </div>

      {/* Expertise areas */}
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-white text-xl sm:text-2xl">What I do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Digital Product Design */}
          <div className="space-y-3">
            <h3 className="text-[#ec4899]">Digital Product Design</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              UX/UI design, product strategy, and user research
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Figma</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Framer</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Webflow</span>
            </div>
          </div>

          {/* Graphic Design */}
          <div className="space-y-3">
            <h3 className="text-[#a855f7]">Graphic Design</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Branding, packaging, and visual identity
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Photoshop</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Illustrator</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">InDesign</span>
            </div>
          </div>

          {/* 3D & Beyond */}
          <div className="space-y-3">
            <h3 className="text-[#18a0fb]">3D & Development</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              3D design, prototyping, and front-end code
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">Blender</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">HTML/CSS</span>
              <span className="px-3 py-1 bg-[#2c2c2c] text-gray-300 text-xs rounded-full">React</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal touch */}
      <div className="border-t border-[#2c2c2c] pt-6 sm:pt-8">
        <p className="text-gray-400 text-sm">
          When I'm not designing, you'll find me traveling for music festivals, attending drag shows, 
          filling up my Steam library, or binging isekai anime.
        </p>
      </div>
    </div>
  );
}
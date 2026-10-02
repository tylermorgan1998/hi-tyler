import { memo } from 'react';
import Spline from '@splinetool/react-spline';
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
          <p className="text-[#d7d7d7] text-base sm:text-lg leading-relaxed">
            I believe great design is about more than aesthetics—it's about <span className="text-[#ec4899]">solving problems</span> and creating meaningful experiences. My approach is rooted in understanding users, embracing simplicity, and pushing the boundaries of innovation.
          </p>
        </div>
      </div>

    </div>
  );
}
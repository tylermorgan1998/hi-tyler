import { Component, type ReactNode } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

// If a Spline scene fails to load, render nothing instead of crashing the whole page
class SplineErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Spline scene failed to load:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Renders at least 2x on desktop so edges stay smooth on 100%-scaled screens.
// Uses Spline's internal renderer (not a public API), so it's guarded: if Spline
// changes it, the scene just keeps its default resolution.
function sharpen(app: Application) {
  if (window.matchMedia("(max-width: 767px)").matches) return;
  const renderer = (app as unknown as { _renderer?: { setPixelRatio?: (ratio: number) => void } })._renderer;
  try {
    renderer?.setPixelRatio?.(Math.max(window.devicePixelRatio, 2));
  } catch {
    // Keep the default resolution
  }
}

// zoom > 1 moves the scene's camera closer, making the scene larger in its box
export function SafeSpline({ scene, zoom, sharp }: { scene: string; zoom?: number; sharp?: boolean }) {
  return (
    <SplineErrorBoundary>
      <Spline
        scene={scene}
        onLoad={app => {
          if (zoom) app.setZoom(zoom);
          if (sharp) sharpen(app);
        }}
      />
    </SplineErrorBoundary>
  );
}

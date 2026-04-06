"use client";

import { useEffect, useRef } from "react";

import styles from "./VantaGlobeBackground.module.css";

// Represents the running Vanta instance so we can destroy it on cleanup.
type VantaEffect = { destroy: () => void };
// Represents the function exported by the Vanta Globe bundle.
type VantaEffectFactory = (options: Record<string, unknown>) => VantaEffect;

export function VantaGlobeBackground() {
  // Marks the DOM element where the Vanta canvas should be inserted.
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  // Starts the decorative Vanta Globe background only in the browser.
  useEffect(() => {
    let effect: VantaEffect | null = null;
    let isActive = true;
    const browserWindow = window as Window & { THREE?: unknown };

    async function loadBackgroundEffect() {
      if (!backgroundRef.current) {
        return;
      }

      // Vanta Globe depends on Three.js, so we load it first.
      const threeModule = await import("three");

      // Vanta expects THREE to exist on window when the effect bundle runs.
      browserWindow.THREE = threeModule;

      // Loads the Globe effect bundle itself.
      const globeModule = await import("vanta/dist/vanta.globe.min.js");

      if (!isActive || !backgroundRef.current) {
        return;
      }

      // Normalizes the bundle export into a callable effect factory.
      const createGlobeEffect = (globeModule.default ??
        globeModule) as unknown as VantaEffectFactory;

      // Initializes the Globe effect with our current visual settings.
      effect = createGlobeEffect({
        el: backgroundRef.current,
        // Lets the globe react slightly when the mouse moves.
        mouseControls: true,
        // Keeps the same interaction on touch devices.
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        // Uses a darker navy background tone behind the original globe colors.
        backgroundColor: 0x0f172a,
        // Uses the original brighter globe wireframe colors.
        color: 0xff3f81,
        color2: 0xffffff,
        // Matches the default Vanta Globe size more closely.
        size: 1,
      });
    }

    void loadBackgroundEffect();

    return () => {
      isActive = false;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      // This empty element is only used as the Vanta canvas host.
      className={styles.background}
      ref={backgroundRef}
    />
  );
}

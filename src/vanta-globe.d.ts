declare module "vanta/dist/vanta.globe.min.js" {
  type VantaEffect = {
    destroy: () => void;
    resize?: () => void;
  };

  type VantaEffectFactory = (
    options: Record<string, unknown>
  ) => VantaEffect;

  const createGlobeEffect: VantaEffectFactory;

  export default createGlobeEffect;
}

# TODO

<!-- p5js-v2-audit-2026-09-05 -->
## p5.js 2.x Upgrade: MicroSim Fixes Needed (2026-09-05)

A static scan of this repo's `docs/sims/` MicroSims found **3 sim(s)** using p5.js v1-only APIs that will break if upgraded to p5.js 2.x (the microsim-generator skill's templates now default to p5@2.3.2). Fix these before bumping this repo's MicroSims past p5@1.x.

**High-leverage fix**: the following filename(s) are copied into multiple sim directories with the identical bug, so patching the source template once and re-copying it is likely cheaper than fixing each sim by hand:

- `sketch.js` — appears in 3 affected sims below

- [ ] **comparative-synteny-map** (`docs/sims/comparative-synteny-map/`)
    - `sketch.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **enhancer-promoter-loop** (`docs/sims/enhancer-promoter-loop/`)
    - `sketch.js` uses `curveVertex(...)`, renamed to `splineVertex()` in v2 with changed anchor-point rules — rename to `splineVertex()`; drop the old duplicated first/last anchor points and rely on `endShape(CLOSE)` for a smooth closed loop.
- [ ] **fine-structure-mapping** (`docs/sims/fine-structure-mapping/`)
    - `sketch.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.

Reference: [p5.js Teachers' Guide to v2 transition](https://p5js.org/tutorials/v2_transition/)

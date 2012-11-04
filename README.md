[in development]
# Photoshop extension that makes possible to convert layer style/font properties to CSS

## Features
* Drop Shadow, Outer Glow, Inner Shadow, Inner Glow ⇝ `box-shadow`. <br/>**Support of blending modes!** Resulting color corrected to match FX.
* Gradient Overlay, Color Overlay and layer fill (Gradient or Solid Color) ⇝ merged `background`.
* If recognized rectangle ⇝ `border-radius`, `transform`, `width` and `height`.
* Vector Mask ⇝ SVG in `background: url(data:image/svg+xml,…)`.
* Pattern fill ⇝ `background: url(data:image/png,…)`
* Character & Paragraph ⇝ `font-*` & `text-*`.
* Multiple selected layers ⇝ composite style.
* Browser prefixes.
* Color formats: `rgba`, `hsla`, `hex`.

## Usage
1. Install `Photoshopr.exp` as extension
2. Open _Window_ → _Extensions_ → _Photoshopr_
3. Select layer and press _Get CSS_
4. Paste result into your IDE, editor or web-inspector!

## License
MIT
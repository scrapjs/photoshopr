[in development]
# Photoshop extension that makes possible to convert layer style/font properties to CSS

## Features
* _Drop Shadow_, _Outer Glow_, _Inner Shadow_, _Inner Glow_ ⇝ `box-shadow`. <br/>**Support of blending modes!** Resulting color corrected to match FX.
* _Gradient Overlay_, _Color Overlay_ and layer fill (<em>Gradient</em> or _Solid Color_) ⇝ merged `background`.
* Recognized rectangle ⇝ `border-radius`, `transform`, `width` and `height`.
* _Vector Mask_ ⇝ SVG in `background: url(data:image/svg+xml,…)`.
* _Pattern fill_ ⇝ `background: url(data:image/png,…)`
* _Character_ & _Paragraph_ ⇝ `font-*` & `text-*`.
* Multiple selected layers ⇝ composite style.
* Browser prefixes.
* Color formats: `rgba`, `hsla`, `hex`.

## Usage
1. Install `Photoshopr.exp` as extension
2. Open _Window_ → _Extensions_ → _Photoshopr_
3. Select layer and press _Ges CSS_
4. Paste result into your IDE, editor or even web-inspector!

## License
MIT
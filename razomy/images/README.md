# @razomy/images

[![TypeScript](https://img.shields.io/npm/types/@razomy/images)](https://www.npmjs.com/package/@razomy/images)
[![Node.js Version](https://img.shields.io/node/v/@razomy/images)](https://www.npmjs.com/package/@razomy/images)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/images)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/images)](https://www.npmjs.com/package/@razomy/images)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/images)](https://bundlephobia.com/package/@razomy/images)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/images)](https://www.npmjs.com/package/@razomy/images)

[Npm](https://www.npmjs.com/package/@razomy/images) |
[Npmx](https://npmx.dev/package/@razomy/images) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/images) |
[Razomy Io](https://io.razomy.org/images) |
[Razomy Cli](https://github.com/razomy/cli)

> Powerful utilities for processing, formatting, and converting various image types

## 🚀 Start

### Install

```sh
npm i @razomy/images
# or
bun add @razomy/images
# or
razomy cli add @razomy/images
```

### Import

```ts
import * as images from '@razomy/images';
// or
import * as images from "npm:@razomy/images";
// or
import * as images from "https://esm.sh/@razomy/images";
// or
import * as images from "https://unpkg.com/@razomy/images";
// or
import { advanced } from '@razomy/images';
// or
razomy run @razomy/images advanced detectEdges
```

## 📑 Table of Contents

**Types**

- [advanced.ImageMetadata](#imagemetadata)
- [advanced.ImageStats](#imagestats)
- [export_.AllImageFileExtensionType](#allimagefileextensiontype)
- [export_.getConversions](#getconversions)
- [export_.ImageFormat](#imageformat)
- [export_.images](#images)
- [export_.imageWriteTargets](#imagewritetargets)
- [export_.OnlyReadImageFileExtensionType](#onlyreadimagefileextensiontype)
- [export_.ReadAndWriteImageFileExtensionType](#readandwriteimagefileextensiontype)
- [Image](#image)

**Functions**

- [advanced.detectEdges](#detectedges)
- [advanced.dilate](#dilate)
- [advanced.erode](#erode)
- [advanced.getHistogram](#gethistogram)
- [advanced.getMetadata](#getmetadata)
- [advanced.getStats](#getstats)
- [advanced.threshold](#threshold)
- [color.addAlpha](#addalpha)
- [color.brightness](#brightness)
- [color.contrast](#contrast)
- [color.extractChannel](#extractchannel)
- [color.gamma](#gamma)
- [color.grayscale](#grayscale)
- [color.invert](#invert)
- [color.normalize](#normalize)
- [color.removeAlpha](#removealpha)
- [color.sepia](#sepia)
- [color.toColorspace](#tocolorspace)
- [compositing.blend](#blend)
- [compositing.composite](#composite)
- [compositing.drawCircle](#drawcircle)
- [compositing.drawLine](#drawline)
- [compositing.drawRectangle](#drawrectangle)
- [compositing.join](#join)
- [export_.avif](#avif)
- [export_.gif](#gif)
- [export_.heic](#heic)
- [export_.ico](#ico)
- [export_.jpeg](#jpeg)
- [export_.png](#png)
- [export_.tiff](#tiff)
- [export_.webp](#webp)
- [filter.blur](#blur)
- [filter.emboss](#emboss)
- [filter.median](#median)
- [filter.noise](#noise)
- [filter.pixelate](#pixelate)
- [filter.sharpen](#sharpen)
- [filter.unsharpMask](#unsharpmask)
- [geometry.crop](#crop)
- [geometry.extend](#extend)
- [geometry.flip](#flip)
- [geometry.resize](#resize)
- [geometry.rotate](#rotate)
- [geometry.smartCrop](#smartcrop)
- [geometry.thumbnail](#thumbnail)
- [geometry.trim](#trim)
- [import_.createBlank](#createblank)
- [import_.getFile](#getfile)
- [import_.setFile](#setfile)

## 📚 Documentation

### Types

#### ImageMetadata

#### ImageStats

#### AllImageFileExtensionType

#### getConversions

#### ImageFormat

#### images

#### imageWriteTargets

#### OnlyReadImageFileExtensionType

#### ReadAndWriteImageFileExtensionType

#### Image

### Functions

#### detectEdges

`advanced.detectEdges(image: Image): Image`

Detect edges in an image.
Applies the Canny edge detection algorithm to the provided image and returns a new image with the detected edges.

Examples

```ts
detectEdges(image); // Image
```

```ts
detectEdges(photo); // Image
```

```ts
detectEdges(drawing); // Image
```

#### dilate

`advanced.dilate(image: Image, size: number): Image`

Apply morphological dilation to an image.
Performs morphological dilation, which expands bright areas and reduces dark areas in the image. It is implemented using a maximum rank filter over a square neighborhood of the specified size.

Examples

```ts
dilate(image); // Image
```

```ts
dilate(image, 5); // Image
```

```ts
dilate(image, 7); // Image
```

#### erode

`advanced.erode(image: Image, size: number): Image`

Apply morphological erosion to an image.
Performs morphological erosion on the image using a square structuring element of the given size. This operation expands dark regions and shrinks bright regions by applying a local minimum filter.

Examples

```ts
erode(image); // Image // instance with default kernel size 3
```

```ts
erode(image, 5); // Image // instance with kernel size 5
```

```ts
erode(image, 7); // Image // instance with kernel size 7
```

#### getHistogram

`advanced.getHistogram(image: Image): Image`

Get the histogram of an image.
Computes the frequency distribution of pixel intensities for the provided image.

Examples

```ts
const img = new Image(2, 2);
getHistogram(img); // Image
```

```ts
getHistogram(darkImage); // Image
```

```ts
getHistogram(brightImage); // Image
```

#### getMetadata

`advanced.getMetadata(image: Image): ImageMetadata`

Get metadata from an image.
Extracts and returns the metadata properties of the provided image, such as dimensions, band count, color space, and alpha channel presence.

Examples

```ts
const image = { width: 1920, height: 1080, bands: 3, interpretation: 'srgb', hasAlpha: () => false };
getMetadata(image); // { width: 1920, height: 1080, bands: 3, space: srgb, hasAlpha: false }
```

```ts
const image = { width: 500, height: 500, bands: 4, interpretation: 'rgba', hasAlpha: () => true };
getMetadata(image); // { width: 500, height: 500, bands: 4, space: rgba, hasAlpha: true }
```

```ts
const image = { width: 128, height: 128, bands: 1, interpretation: 'b-w', hasAlpha: () => false };
getMetadata(image); // { width: 128, height: 128, bands: 1, space: b-w, hasAlpha: false }
```

#### getStats

`advanced.getStats(image: Image): ImageStats`

Get basic statistics of an image.
Retrieves the minimum, maximum, and average pixel values from the provided image instance.

Examples

```ts
getStats({ min: () => 0, max: () => 255, avg: () => 127.5 } as Image); // { min: 0, max: 255, avg: 127.5 }
```

```ts
getStats({ min: () => 10, max: () => 240, avg: () => 100 } as Image); // { min: 10, max: 240, avg: 100 }
```

```ts
getStats({ min: () => 50, max: () => 50, avg: () => 50 } as Image); // { min: 50, max: 50, avg: 50 }
```

#### threshold

`advanced.threshold(image: Image, level: number): Image`

Apply threshold to an image.
Applies a fixed-level threshold to the image, returning a new binary image where values greater than the given level are evaluated.

Examples

```ts
threshold(image); // Image //  Uses default level 128
```

```ts
threshold(image, 100); // Image
```

```ts
threshold(image, 200); // Image
```

#### addAlpha

`color.addAlpha(image: Image, alphaValue: number): Image`

Add an alpha channel to an image.
Evaluates the number of bands in the given image and appends an alpha channel with the specified value if it does not already exist.

Examples

```ts
const image = { bands: 3, bandjoin: (v) => ({ bands: 4 }) } as Image;
addAlpha(image); // returns image with 4 bands
```

```ts
const image = { bands: 1, bandjoin: (v) => ({ bands: 2 }) } as Image;
addAlpha(image, 128); // returns image with 2 bands and 128 alpha
```

```ts
const image = { bands: 4, bandjoin: (v) => ({ bands: 5 }) } as Image;
addAlpha(image); // returns the original image (already has alpha)
```

#### brightness

`color.brightness(image: Image, value: number): Image`

Adjust the brightness of an image.
Multiplies the pixel values of the image by a specified multiplier to adjust its brightness. A value of 1.0 indicates no change, values greater than 1.0 increase brightness, and values between 0.0 and 1.0 decrease brightness.

Examples

```ts
brightness(image, 1.0); // Image (no change)
```

```ts
brightness(image, 2.0); // Image (double brightness)
```

```ts
brightness(image, 0.5); // Image (half brightness)
```

#### contrast

`color.contrast(image: Image, value: number): Image`

Adjust the contrast of an image.
Applies a linear transformation to adjust the contrast of an image based on a multiplier value.

Examples

```ts
contrast(image, 1.5); // Image
```

```ts
contrast(image, 0.8); // Image
```

```ts
contrast(image, 1.0); // Image
```

#### extractChannel

`color.extractChannel(image: Image, channelIndex: number): Image`

Extract a specific color channel from an image.
Extract a specific color channel from an image by its index.

Examples

```ts
extractChannel(image, 0); // Image
```

```ts
extractChannel(image, 1); // Image
```

```ts
extractChannel(image, 3); // Image
```

#### gamma

`color.gamma(image: Image, value: number): Image`

Applies gamma correction to an image.
Adjusts the gamma level of an image using the specified exponent value.

Examples

```ts
gamma(image); // Image // Uses default value 2.2
```

```ts
gamma(image, 1.5); // Image
```

```ts
gamma(image, 0.8); // Image
```

#### grayscale

`color.grayscale(image: Image): Image`

Convert an image to grayscale.
Changes the colourspace of the provided image to black and white.

Examples

```ts
const image = Vips.Image.newFromFile('input.jpg');
const grayImage = grayscale(image); // Image
```

```ts
const image = Vips.Image.black(100, 100);
const grayImage = grayscale(image); // Image
```

```ts
const image = Vips.Image.newFromMemory(buffer, 100, 100, 3, 'uchar');
const grayImage = grayscale(image); // Image
```

#### invert

`color.invert(image: Image): Image`

Invert image colors.
Invert the colors of the given image.

Examples

```ts
invert(image); // Image
```

```ts
invert(createImage(100, 100)); // Image
```

```ts
invert(decode('image.png')); // Image
```

#### normalize

`color.normalize(image: Image): Image`

Normalize image contrast.
Automatically stretches the image histogram to improve overall contrast.

Examples

```ts
const normalizedImage = normalize(image); // Image
```

```ts
const improvedImage = normalize(fadedImage); // Image
```

```ts
const result = normalize(sourceImage); // Image
```

#### removeAlpha

`color.removeAlpha(image: Image, background: ArrayConstant): Image`

Remove the alpha channel from an image.
Removes the alpha channel from an image by flattening it against a specified background color. Returns the original image if it has no alpha channel.

Examples

```ts
const result = removeAlpha(image); // Image
```

```ts
const result = removeAlpha(image, [0, 0, 0]); // Image
```

```ts
const result = removeAlpha(image, [255, 0, 0]); // Image
```

#### sepia

`color.sepia(image: Image): Image`

Apply a sepia filter to an image.
Recombines the color channels of the image using a sepia transformation matrix to produce a vintage, warm-toned effect.

Examples

```ts
const image = new Image(100, 100);
sepia(image); // Image
```

```ts
const image = await readImage('input.png');
sepia(image); // Image
```

```ts
const image = parseImage(rawBuffer);
sepia(image); // Image
```

#### toColorspace

`color.toColorspace(image: Image, space: Interpretation): Image`

Convert an image to a specified colorspace.
Transforms the color profile of the given image to the target colorspace interpretation using the libvips engine.

Examples

```ts
toColorspace(image, Vips.Interpretation.srgb); // Image
```

```ts
toColorspace(image, Vips.Interpretation.cmyk); // Image
```

```ts
toColorspace(image, Vips.Interpretation.b_w); // Image
```

#### blend

`compositing.blend(base: Image, overlay: Image, mode: BlendMode, opacity: number): Image`

Blends two images together using a specified blend mode and opacity.
Composites an overlay image onto a base image. Supports various blend modes (e.g., over, multiply, screen) and adjustable overlay opacity. Memory is automatically managed for temporary intermediate images.

Examples

```ts
blend(baseImage, overlayImage); // Image
```

```ts
blend(baseImage, overlayImage, Vips.BlendMode.multiply); // Image
```

```ts
blend(baseImage, overlayImage, Vips.BlendMode.screen, 0.5); // Image
```

#### composite

`compositing.composite(baseImage: Image, overlayImage: Image, x: number, y: number, mode: BlendMode): Image`

Composite an overlay image onto a base image.
Blends an overlay image onto a base image at the specified x and y coordinates using a given blend mode.

Examples

```ts
composite(baseImage, overlayImage, 0, 0); // Image
```

```ts
composite(baseImage, overlayImage, 10, 10, Vips.BlendMode.multiply); // Image
```

```ts
composite(baseImage, overlayImage, 50, 100, Vips.BlendMode.screen); // Image
```

#### drawCircle

`compositing.drawCircle(image: Image, x: number, y: number, radius: number, color: ArrayConstant): Image`

Draw a filled circle on an image.
Creates a copy of the provided image and draws a filled circle at the specified coordinates with the given radius and color.

Examples

```ts
drawCircle(image, 50, 50, 25, [255, 0, 0]); // Image
```

```ts
drawCircle(image, 100, 100, 10, [0, 255, 0, 128]); // Image
```

```ts
drawCircle(image, 0, 0, 100, [0, 0, 255]); // Image
```

#### drawLine

`compositing.drawLine(image: Image, x1: number, y1: number, x2: number, y2: number, color: ArrayConstant): Image`

Draw a line on an image.
Creates a copy of the provided image and draws a line from the starting coordinates to the ending coordinates using the specified color.

Examples

```ts
drawLine(image, 0, 0, 100, 100, [255, 0, 0]); // Image
```

```ts
drawLine(image, 10, 20, 10, 80, [0, 255, 0]); // Image
```

```ts
drawLine(image, 0, 50, 100, 50, [0, 0, 255]); // Image
```

#### drawRectangle

`compositing.drawRectangle(image: Image, x: number, y: number, width: number, height: number, color: ArrayConstant): Image`

Draw a filled rectangle on an image.
Creates a copy of the given image and draws a filled rectangle at the specified coordinates with the provided dimensions and color.

Examples

```ts
drawRectangle(image, 0, 0, 10, 10, [0, 0, 0]); // Image
```

```ts
drawRectangle(image, 10, 10, 50, 50, [255, 0, 0]); // Image
```

```ts
drawRectangle(image, 5, 5, 100, 20, [0, 0, 255, 255]); // Image
```

#### join

`compositing.join(images: Image[], direction: Direction): Image`

Join an array of images into a single image.
Concatenates multiple images either vertically or horizontally to create a single combined image.

Examples

```ts
join([image1, image2]); // Image
```

```ts
join([image1, image2], Vips.Direction.horizontal); // Image
```

```ts
join([image1, image2, image3], Vips.Direction.vertical); // Image
```

#### avif

`export_.avif(image: Image): ExtensionResult`

Export an image to AVIF format.
Encodes the provided image instance into an AVIF formatted buffer utilizing AV1 compression.

Examples

```ts
const buffer = avif(image); // Image
```

```ts
const response = new Response(avif(image)); // Image
```

```ts
const byteLength = avif(image).byteLength; // Image
```

#### gif

`export_.gif(image: Image): ExtensionResult`

Export image to GIF format buffer.
Converts and saves the provided image as a GIF buffer with maximum metadata retention and high compression effort.

Examples

```ts
const buffer = gif(image); // Image
```

```ts
await fs.promises.writeFile('output.gif', gif(image)); // Image
```

```ts
const base64 = Buffer.from(gif(image)).toString('base64'); // Image
```

#### heic

`export_.heic(image: Image, quality: number): ExtensionResult`

Export image to HEIC format.
Converts and exports the given image to a HEIC format buffer using HEVC compression.

Examples

```ts
const buffer = heic(image); // Image
```

```ts
const buffer = heic(image, 80); // Image
```

```ts
const buffer = heic(image, 100); // Image
```

#### ico

`export_.ico(image: Image): ExtensionResult`

Export image as a 256x256 PNG buffer for icons.
Resizes the provided image to a strict 256x256 pixel dimension while retaining metadata, and encodes it into a PNG buffer suitable for use as an application icon or favicon.

Examples

```ts
const iconBuffer = ico(image); // Image
```

```ts
const buffer = ico(image);
await fs.promises.writeFile('favicon.png', buffer); // Image
```

```ts
const buffer = ico(image);
res.setHeader('Content-Type', 'image/png');
res.send(buffer); // Image
```

#### jpeg

`export_.jpeg(image: Image): ExtensionResult`

Export an image to JPEG format.
Exports the provided image into a JPEG buffer array using optimized coding, 80% quality, and no chroma subsampling.

Examples

```ts
const buffer = jpeg(sourceImage); // Image
```

```ts
const avatarBuffer = jpeg(resizedAvatar); // Image
```

```ts
const backgroundBuffer = jpeg(heroBanner); // Image
```

#### png

`export_.png(image: Image): ExtensionResult`

Export image to PNG buffer.
Exports the given image to a Uint8Array buffer formatted as a PNG. It uses a compression level of 8, palette optimization, and an effort level of 7 while keeping all foreign metadata.

Examples

```ts
const buffer = png(image); // Image
```

```ts
const size = png(image).byteLength; // Image
```

```ts
await fs.promises.writeFile('output.png', png(image)); // Image
```

#### tiff

`export_.tiff(image: Image): ExtensionResult`

Export an image to TIFF format buffer.
Converts the provided image to a TIFF format and returns it as a buffer array. Applies LZW compression and keeps all metadata by default.

Examples

```ts
const tiffBuffer = tiff(image); // Image
```

```ts
await fs.promises.writeFile('output.tiff', tiff(image)); // Image
```

```ts
const response = new Response(tiff(image), { headers: { 'Content-Type': 'image/tiff' } }); // Image
```

#### webp

`export_.webp(image: Image): ExtensionResult`

Export image to WebP.
Encodes and exports the given image into a WebP formatted buffer.

Examples

```ts
webp(image); // Uint8Array( [ ... ] )
```

```ts
webp(image, { Q: 100 }); // Uint8Array( [ ... ] )
```

```ts
webp(image, { lossless: true, effort: 6 }); // Uint8Array( [ ... ] )
```

#### blur

`filter.blur(image: Image, radius: number): Image`

Apply a Gaussian blur filter to an image.
Apply a Gaussian blur filter to an image with the specified radius.

Examples

```ts
blur(image); // Image
```

```ts
blur(image, 3); // Image
```

```ts
blur(image, 10); // Image
```

#### emboss

`filter.emboss(image: Image): Image`

Apply an emboss filter to the image.
Applies an emboss convolution matrix to the given image to create a 3D shadow effect.

Examples

```ts
emboss(image); // Image
```

```ts
emboss(Vips.Image.newFromFile('input.jpg')); // Image
```

```ts
emboss(Vips.Image.black(100, 100)); // Image
```

#### median

`filter.median(image: Image, size: number): Image`

Apply a median filter to an image.
Applies a median filter to the given image to reduce noise, using a square matrix of the specified size.

Examples

```ts
median(image); // Image
```

```ts
median(image, 5); // Image
```

```ts
median(image, 7); // Image
```

#### noise

`filter.noise(image: Image, amount: number): Image`

Add Gaussian noise to an image.
Generates a Gaussian noise layer based on the specified amount and adds it to the provided image to simulate film grain or sensor noise.

Examples

```ts
const result = noise(image); // Image
```

```ts
const result = noise(image, 20); // Image
```

```ts
const result = noise(image, 50); // Image
```

#### pixelate

`filter.pixelate(image: Image, pixelSize: number): Image`

Pixelate an image.
Creates a pixelated version of the provided image by scaling it down and then scaling it back up. Intermediate resources are safely freed.

Examples

```ts
pixelate(image); // Image
```

```ts
pixelate(image, 5); // Image
```

```ts
pixelate(image, 20); // Image
```

#### sharpen

`filter.sharpen(image: Image, intensity: number): Image`

Sharpen an image.
Applies a sharpening filter to the provided image using the specified intensity.

Examples

```ts
sharpen(image); // Image
```

```ts
sharpen(image, 2.5); // Image
```

```ts
sharpen(image, 0.5); // Image
```

#### unsharpMask

`filter.unsharpMask(image: Image, sigma: number, x1: number, y2: number): Image`

Apply an unsharp mask filter to an image.
Enhances the sharpness of an image using an unsharp mask technique. The `sigma` parameter controls the radius of the blur, `x1` controls the sharpening strength, and `y2` sets the threshold level.

Examples

```ts
unsharpMask(image); // Image
```

```ts
unsharpMask(image, 2.0); // Image
```

```ts
unsharpMask(image, 1.5, 2.0, 15); // Image
```

#### crop

`geometry.crop(image: Image, x: number, y: number, width: number, height: number): Image`

Crop an image to the specified dimensions.
Crops the given image starting at coordinates (x, y) with the specified width and height.

Examples

```ts
crop(image, 0, 0, 100, 100); // Image
```

```ts
crop(image, 50, 50, 200, 150); // Image
```

```ts
crop(image, 10, 20, 30, 40); // Image
```

#### extend

`geometry.extend(image: Image, left: number, right: number, top: number, bottom: number, background: ArrayConstant): Image`

Extend image boundaries.
Extend image boundaries by adding padding to the left, right, top, and bottom with a specified background color.

Examples

```ts
extend(image, 10, 10, 10, 10); // Image
```

```ts
extend(image, 0, 50, 0, 50, [255, 255, 255, 255]); // Image
```

```ts
extend(image, 5, 5, 0, 0, [255, 0, 0]); // Image
```

#### flip

`geometry.flip(image: Image, axis: "horizontal" | "vertical"): Image`

Flip an image along a specified axis.
Creates a new image that is flipped either horizontally or vertically based on the provided axis.

Examples

```ts
flip(image, 'horizontal'); // Image
```

```ts
flip(image, 'vertical'); // Image
```

```ts
flip(flip(image, 'horizontal'), 'vertical'); // Image
```

#### resize

`geometry.resize(image: Image, width: number, height: number | undefined, mode: Kernel): Image`

Resize an image to a specific width and optional height.
Scales an image uniformly if only width is provided, or non-uniformly if both width and height are specified. Uses Lanczos3 interpolation by default.

Examples

```ts
resize(image, 800); // Image
```

```ts
resize(image, 800, 600); // Image
```

```ts
resize(image, 1920, 1080, Vips.Kernel.nearest); // Image
```

#### rotate

`geometry.rotate(image: Image, angle: number, backgroundColor: ArrayConstant): Image`

Rotate an image.
Rotates an image by a specified angle in degrees. The empty space created by the rotation is filled with the provided background color.

Examples

```ts
rotate(image, 90); // Image
```

```ts
rotate(image, 45, [255, 255, 255]); // Image
```

```ts
rotate(image, 180, [255, 0, 0, 255]); // Image
```

#### smartCrop

`geometry.smartCrop(image: Image, width: number, height: number, interesting: Interesting): Image`

Smartly crop an image to the specified dimensions.
Crops an image down to a given width and height by removing the least interesting areas based on the provided strategy.

Examples

```ts
smartCrop(image, 300, 300); // Image
```

```ts
smartCrop(image, 800, 600, Vips.Interesting.entropy); // Image
```

```ts
smartCrop(image, 150, 150, Vips.Interesting.attention); // Image
```

#### thumbnail

`geometry.thumbnail(image: Image, width: number, height: number): Image`

Create an optimized thumbnail of an image.
Generates a scaled-down version of the provided image using a fast, highly optimized reduction algorithm.

Examples

```ts
const thumb = thumbnail(image, 150, 150); // Image
```

```ts
const avatar = thumbnail(image, 64, 64); // Image
```

```ts
const preview = thumbnail(image, 1280, 720); // Image
```

#### trim

`geometry.trim(image: Image, threshold: number): Image`

Trim an image by removing its monotonous background.
Finds the trim boundaries of an image using a threshold and extracts the trimmed area.

Examples

```ts
trim(image); // Image
```

```ts
trim(image, 20); // Image
```

```ts
trim(image, 5); // Image
```

#### createBlank

`import_.createBlank(width: number, height: number, background: number[]): Image`

Create a blank image.
Creates a new blank Vips image with specified dimensions and background color.

Examples

```ts
createBlank(100, 100); // Image
```

```ts
createBlank(800, 600, [255, 255, 255]); // Image
```

```ts
createBlank(500, 500, [255, 0, 0, 255]); // Image
```

#### getFile

`import_.getFile(inputPath: string): Promise<Image>`

Convert an image file to a specified format.
Reads an image from the provided file path.

Examples

```ts
await getFile('./input.jpg', 'png'); // Image
```

```ts
await getFile('./avatar.webp', 'jpeg'); // Image
```

```ts
await getFile('./photo.heic', 'avif'); // Image
```

#### setFile

`import_.setFile(buffer: Uint8Array<ArrayBufferLike>, fileExtensionType: ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType): ExtensionResult`

Convert an image file to a specified format.
Converts it to the requested format using wasm-vips. Returns a readable stream of the converted image along with its media type and extension metadata.

Examples

```ts
await setFile(image, 'png'); // void
```

```ts
await setFile(image, 'jpeg'); // void
```

```ts
await setFile(image, 'avif'); // void
```

## 🕊️ Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

## 💖 Fuel Our Shared Future

We can't build this without you.
If this library has saved you time or helped turn chaos into clarity in your own projects,
 please consider backing the developers behind it. 
 Building reliable, open-source tools takes immense time and energy.
Your sponsorship isn't just a donation; 
it’s the fuel that keeps this project actively maintained, bug-free, and thriving for everyone who relies on it.

Help us keep the momentum going. Choose how you want to light the way:

- [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
- [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
- [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
- [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/razomy/js/issues).

## 📝 License

Copyright © 2026 [Razomy](https://github.com/razomy).
This project is [MIT](https://github.com/razomy/js/blob/main/LICENSE) licensed.

## 🐛 Reporting Issues

We use GitHub Issues as the official bug tracker for this project.

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).

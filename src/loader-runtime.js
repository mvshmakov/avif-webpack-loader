import wasmImageLoader from '@saschazar/wasm-image-loader'
import wasmAvif from '@saschazar/wasm-avif'
import defaultOptions from '@saschazar/wasm-avif/options'

// See AVIF_PIXEL_FORMAT in `@saschazar/wasm-avif`
const getPixelFormat = pixelFormat => {
  switch (pixelFormat) {
    case 'YUV444':
      return 1
    case 'YUV422':
      return 2
    case 'YUV420':
      return 3
    case 'YUV400':
      return 4
    default:
      return 0
  }
}

export default async function runtime({ source, options }) {
  const { alpha = false, pixelFormat, ...encoderOptions } = options
  const channels = alpha ? 4 : 3

  const [decoder, encoder] = await Promise.all([
    wasmImageLoader({
      noInitialRun: true
    }),
    wasmAvif({
      noInitialRun: true
    })
  ])

  const decodedUint8Array = decoder.decode(source, source.length, channels)
  const { width, height } = decoder.dimensions()

  const encodedUint8Array = encoder.encode(
    decodedUint8Array,
    width,
    height,
    channels,
    {
      ...defaultOptions,
      ...encoderOptions
    },
    getPixelFormat(pixelFormat)
  )

  decoder.free()
  encoder.free()

  return encodedUint8Array
}

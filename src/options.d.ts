export interface AvifWebpackLoaderOptions {
  alpha: boolean
  pixelFormat: 'YUV444' | 'YUV422' | 'YUV420' | 'YUV400' | 'NONE'

  minQuantizer?: number
  maxQuantizer?: number
  minQuantizerAlpha?: number
  maxQuantizerAlpha?: number
  tileRowsLog2?: number
  tileColsLog2?: number
  speed?: number
}

/**
 * @jest-environment node
 */

import path from 'path'
import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'

const compiler = loaderOptions => {
  const compiler = webpack({
    mode: 'production',
    entry: './entry.js',
    context: __dirname,
    output: {
      path: path.join(path.resolve(__dirname), 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'images/[name].[ext].avif' }
            },
            {
              loader: path.join(path.resolve(__dirname), '..', 'src', 'loader'),
              options: loaderOptions
            }
          ]
        }
      ]
    }
  })

  if (process.env.RUN_IN_MEMORY) {
    compiler.outputFileSystem = createFsFromVolume(new Volume())
    compiler.outputFileSystem.join = path.join.bind(path)
  }

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors))

      resolve(stats)
    })
  })
}

describe('avif-webpack-loader', () => {
  const jpgAssetName = 'images/kitten.jpg.avif'
  const pngAssetName = 'images/kitten.png.avif'

  beforeEach(() => {
    // Fix for async jest test functions, see https://github.com/facebook/jest/issues/6434
    jest.useFakeTimers()
  })

  test('loads JPG/PNG and encodes it as AVIF', async () => {
    const stats = await compiler({ alpha: true, pixelFormat: 'YUV444' })
    const { assets } = stats.compilation

    expect(jpgAssetName in assets).toBeTruthy()
    expect(assets[jpgAssetName].emitted).toBeTruthy()

    expect(pngAssetName in assets).toBeTruthy()
    expect(assets[pngAssetName].emitted).toBeTruthy()
  })

  test('complains if incorrect option is passed', () => {
    const compilerExecutor = async () => await compiler({ randomField: true })
    expect(compilerExecutor).rejects.toThrow()
  })

  test('throws AvifWebpackLoaderError if malformed image is received', () => {})
})

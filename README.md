# <img src="public/logo.svg" width="40" align="center"> avif-webpack-loader

[![GitHub release](https://img.shields.io/github/release/mvshmakov/avif-webpack-loader.svg)](https://github.com/mvshmakov/avif-webpack-loader/releases/)
[![Build Status](https://github.com/mvshmakov/avif-webpack-loader/workflows/PerCommitCI/badge.svg?branch=master)](https://github.com/mvshmakov/avif-webpack-loader/actions?query=workflow%3APerCommitCI+branch%3Amaster)
[![dependencies Status](https://david-dm.org/mvshmakov/avif-webpack-loader/master/status.svg)](https://david-dm.org/mvshmakov/avif-webpack-loader/master)
[![devDependencies Status](https://david-dm.org/mvshmakov/avif-webpack-loader/master/dev-status.svg)](https://david-dm.org/mvshmakov/avif-webpack-loader/master?type=dev)

Webpack loader for AVIF-encoded images

## Installation

```bash
yarn add -D avif-webpack-loader
```

or

```bash
npm install --save-dev avif-webpack-loader
```

## Usage

Here is the example of using `avif-webpack-loader` along with common [file-loader](https://github.com/webpack/file-loader):

```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loaders: ['file-loader', 'avif-webpack-loader']
  }
]
```

You can pass the options to `avif-webpack-loader` in a different ways. The preferred one is using options:

```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loaders: [
      'file-loader',
      { loader: 'avif-webpack-loader', options: { alpha: true } }
    ]
  }
]
```

Normally you don't want to convert all of your images to AVIF format, you just want to make alternate versions. You can use [multi-loader](https://github.com/webpack-contrib/multi-loader) to achieve it:

```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loader: multi(
      'file-loader?name=[name].[ext].avif!avif-loader?{alpha:true}'
      'file-loader?name=[name].[ext]',
    )
  },
]
```

## Options

|       Name        |                        Type                        |  Default   | Description            |
| :---------------: | :------------------------------------------------: | :--------: | :--------------------- |
|    **`alpha`**    |                    `{Boolean}`                     |  `false`   | Preserve alpha channel |
| **`pixelFormat`** | `{"YUV444"\|"YUV422"\|"YUV420"\|"YUV400"\|"NONE"}` | `"YUV444"` | Defines pixel format   |

## Credits

This module uses the [saschazar21/webassembly/avif](https://github.com/saschazar21/webassembly/tree/master/packages/avif)'s and [saschazar21/webassembly/image-loader](https://github.com/saschazar21/webassembly/tree/master/packages/image-loader)'s source codes and most of the code is written according to the examples provided in that repository.

Above-mentioned author says that encoding is still very slow since helpers such as multithreading and/or runtime CPU detection have to be disabled in order to successfully compile to WebAssembly. Any help in the base WebAssembly repository is encouraged.

## Sources

- [AVIF for Next-Generation Image Coding](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4)
- [Jake Archibald "AVIF has landed"](https://jakearchibald.com/2020/avif-has-landed/)
- [libavif - Library for encoding and decoding .avif files](https://github.com/AOMediaCodec/libavif/)

## License

Licensed under the MIT license.

Copyright ©️ 2020 [Maxim Shmakov](https://mvshmakov.dev)

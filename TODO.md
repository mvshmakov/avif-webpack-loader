# TODO

- multiple webpack versions tests?
- bypassOnDebug: true, // webpack@1.x
  disable: true, // webpack@2.x and newer
- Write a README
- loader: 'thread-loader', 'multi-loader' (examples with test usage)

- ts support? (d.ts + project-level support?)
- code climate?
- use rollup

- Tests for the Error (to throw)
- child process, errors handling, tests for it

- Proper .npmignore
- All badges to green, add npm package badge
- Proper publishing to npm with correct build
- npm run release -- --first-release
- standard-version

- Describe the whole options.json
- Tests for each variant of options settings and describe them in docs (3: in string, in loader opts, in root of webpack config)
- This is not a globalOptions, but https://github.com/tcoopman/image-webpack-loader/blob/master/index.js

- Paper on `how to write webpack module with wasm` and `how to use avif in production right now`

- Remove TODO from .gitignore

CHECK IF EVERYTHING BEFORE PUBLISHING

## Options to implement

Webpack plugin/loader (?) for neat AVIF Rust module

Possible solutions:

- `sharp` (https://github.com/lovell/sharp) - the simplest one, but there is already `sharp-loader` (https://github.com/bootstarted/sharp-loader)
- `cavif` (https://github.com/kornelski/cavif) - `node-gyp` for building Rust module as cdylib (or using `neon`/`wasm-pack` (https://rustwasm.github.io/wasm-pack/book/tutorials/hybrid-applications-with-webpack/using-your-library.html)). The only problem here is that library interface is not provided. Solution can be stolen from `imagemin` (like here https://github.com/iampava/imagemin-webp-webpack-plugin), but we do need to generate several binaries for each architecture we want to support on each PR (does not seem wise, but `imagemin` lives with it)

Dev env:

- `nasm` should be installed
- `cargo install cavif`

Plans:

- Write fully JS (NodeJS) AVIF encoder/decoder based on used in `jimp` (https://github.com/oliver-moran/jimp) like `bmp-js` (https://github.com/shaozilee/bmp-js). Examples could be `cavif`/`davif` (https://github.com/link-u/cavif/https://github.com/link-u/davif) - concept is Uint8Array to AVIF container and wise-versa.
- Provide PR in jimp for AVIF support from my library
- Create `sharp-avif-webpack-plugin` based on https://github.com/iampava/imagemin-webp-webpack-plugin module
- Create `native-avif-loader` based on native js implementation
- VSCode preview support

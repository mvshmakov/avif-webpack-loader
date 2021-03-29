import { getOptions } from 'loader-utils'
import validateOptions from 'schema-utils'

import runtime from './loader-runtime'
import optionsSchema from './options.json'

const loaderName = 'AvifWebpackLoader'

class AvifWebpackLoaderError extends Error {
  constructor(message) {
    super(message)

    this.message = message
    this.name = `${loaderName}Error`

    Error.captureStackTrace(this, AvifWebpackLoaderError)
  }
}

export default async function loader(source) {
  // Getting loader options and validating them
  const loaderOptions = getOptions(this)
  validateOptions(optionsSchema, loaderOptions, loaderName)

  // Getting global loader options and validating them
  const configKey = loaderOptions.config || 'avifLoader'
  const globalOptions = (this.options && this.options[configKey]) || {}
  validateOptions(optionsSchema, globalOptions, loaderName)

  const options = { ...loaderOptions, ...globalOptions }

  // We can pass runtime during debug by using:
  // - webpack@1.x: { bypassOnDebug: true }
  // - webpack@2.x and newer: { disable: true }
  const bypassOnDebug = options.bypassOnDebug || options.disable
  if (this.debug === true && bypassOnDebug) {
    return null
  } else {
    try {
      return await runtime({ source, options })
    } catch (error) {
      throw new AvifWebpackLoaderError('Check base image extension/integrity')
    }
  }
}

// Needed for Webpack to pass raw Buffer of image
export const raw = true

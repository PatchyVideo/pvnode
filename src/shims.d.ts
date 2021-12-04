declare module 'polyfill-library' {
  import { ReadStream } from 'fs'
  interface PolyfillMeta {
    dependencies?: string[]
    license?: string
    spec?: string
    repo?: string
    docs?: string
    browsers?: Record<string, string>
    install?: {
      module: string
      paths?: string[]
      postinstall?: string
      clean?: string[]
    }
    detectSource: string
    baseDir: string
    hasTests: boolean
    isTestable: boolean
    isPublic: boolean
    size: number
    aliases?: string[]
    notes?: string[]
    test?: {
      ci: boolean
    }
  }
  interface FeatureProperties {
    aliasOf?: Set<string>
    dependencyOf?: Set<string>
    flags?: Set<string>
  }
  interface FeaturePropertiesRT {
    aliasOf: Set<string>
    dependencyOf: Set<string>
    flags: Set<string>
  }
  interface Options {
    minify?: boolean
    unknown?: 'ignore' | 'polyfill'
    features?: Record<string, FeatureProperties>
    callback?: string | false
    excludes?: string[]
    uaString?: string
    rum?: boolean
  }
  interface OptionsRT {
    minify: boolean
    unknown: 'ignore' | 'polyfill'
    features: Record<string, FeatureProperties>
    callback: string | false
    excludes: string[]
    uaString: string
    rum: boolean
  }
  /**
   * Get a list of all the aliases which exist within the collection of polyfill sources.
   * @returns {Promise<Record<string, string[]>>} A promise which resolves with an object mapping all the aliases within the collection to the polyfills they include.
   */
  export function listAliases(): Promise<Record<string, string[]>>
  /**
   * Get a list of all the polyfills which exist within the collection of polyfill sources.
   * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
   */
  export function listAllPolyfills(): Promise<string[]>
  /**
   * Get the metadata for a specific polyfill within the collection of polyfill sources.
   * @param {String} featureName - The name of a polyfill whose metadata should be returned.
   * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
   */
  export function describePolyfill(featureName: string): Promise<PolyfillMeta | undefined>
  /**
   * Create an options object for use with `getPolyfills` or `getPolyfillString`.
   * @param {Options} options_ - Valid keys are uaString, minify, unknown, excludes, rum and features.
   * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
   * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
   * @param {Record<string, FeatureProperties>} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
   * @param {false|String} [options_.callback=false] - Name of the JavaScript function to call after the polyfill bundle is loaded.
   * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
   * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
   * @param {Boolean} [options_.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data
   * @return {Options} options - options_ merged with the defaults option values.
   */
  export function getOptions(options_: Options): OptionsRT
  interface GetPolyfillsOptions {
    minify?: boolean
    unknown?: 'ignore' | 'polyfill'
    features?: Record<string, FeatureProperties>
    excludes?: string[]
    uaString?: string
    rum?: boolean
  }
  /**
   * Given a set of features that should be polyfilled in 'options.features'
   * (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`),
   * determine which have a configuration valid for the given options.uaString,
   * and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
   *
   * @param {GetPolyfillsOptions} options_ - Valid keys are uaString, minify, unknown, excludes, rum and features.
   * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
   * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
   * @param {Record<string, FeatureProperties>} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
   * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
   * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
   * @param {Boolean} [options_.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data.
   * @return {Promise<Record<string, PolyfillMeta & FeaturePropertiesRT>>} - Canonicalised feature definitions filtered for UA
   */
  export function getPolyfills(
    options_: GetPolyfillsOptions
  ): Promise<Record<string, PolyfillMeta & FeaturePropertiesRT>>
  /**
   * Create a polyfill bundle.
   * @param {object} options_ - Valid keys are uaString, minify, unknown, excludes, rum and features.
   * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
   * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
   * @param {Record<string, FeatureProperties>} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
   * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
   * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
   * @param {Boolean} [options_.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data.
   * @param {Boolean} [options_.stream=false] - Whether to return a stream or a string of the polyfill bundle.
   * @return {Promise<String> | ReadStream} - Polyfill bundle as either a utf-8 stream or a promise of a utf-8 string.
   */
  export function getPolyfillString(options_: GetPolyfillsOptions & { stream?: false }): Promise<string>
  export function getPolyfillString(options_: GetPolyfillsOptions & { stream: true }): ReadStream
  export function normalizeUserAgent(uaString: string): string
}

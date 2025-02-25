/** A custom Error class to be returned in case of an IPA conversion failure.
 *
 * This class extends the built-in Error class and adds a `details` property to provide additional information about the error.
 */
export class IpaConversionError extends Error {
  constructor(message: string, public readonly details?: { cause: string }) {
    super(message)
  }

  /** @override */
  get name(): string {
    return 'IpaConversionError'
  }
}

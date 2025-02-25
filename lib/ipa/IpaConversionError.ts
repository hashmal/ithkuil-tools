export class IpaConversionError extends Error {
  constructor(message: string, public readonly details?: { cause: string }) {
    super(message)
  }

  get name(): string {
    return 'IpaConversionError'
  }
}

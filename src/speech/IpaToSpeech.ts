import { Engine, PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput, TextType, VoiceId } from '@aws-sdk/client-polly'
import { Readable } from 'stream'

type CredentialIdentity = {
  accessKeyId: string,
  secretAccessKey: string,
}

export type IpaToSpeechOptions = {
  languageCode?: string,
  voiceId: string,
  outputFormat: 'mp3' | 'ogg_vorbis',
  sampleRate?: string,
}

export class IpaToSpeech {
  private pollyClient!: PollyClient

  private options: IpaToSpeechOptions = {
    voiceId: 'Pedro',
    outputFormat: 'mp3',
  }

  constructor(private awsConfiguration: { credentials: CredentialIdentity, region: string }, options?: IpaToSpeechOptions) {
    this.options = { ...this.options, ...options }
    this.pollyClient = new PollyClient(this.awsConfiguration)
  }

  public async speak(ipa: string): Promise<Buffer> {
    return this.pollyCommand(ipa).then(this.convertAudioStreamToBuffer)
  }

  private pollyCommand(ipa: string): Promise<SynthesizeSpeechCommandOutput> {

    const synthesizeSpeechCommandInput: SynthesizeSpeechCommandInput = {
      OutputFormat: this.options.outputFormat, // OutputFormat.OGG_VORBIS
      Text: `<speak>
        <prosody rate="slow"><phoneme alphabet="ipa" ph="${ipa}"></phoneme></prosody>
      </speak>`,
      VoiceId: this.options.voiceId as VoiceId,
      Engine: Engine.NEURAL,
      TextType: TextType.SSML,
      SampleRate: this.options.sampleRate,
    }

    const pollyCommand = new SynthesizeSpeechCommand(synthesizeSpeechCommandInput)

    return this.pollyClient.send(pollyCommand)
  }

  private async convertAudioStreamToBuffer({ AudioStream }: SynthesizeSpeechCommandOutput): Promise<Buffer> {
    const chunks: Uint8Array[] = []
    for await (const chunk of (AudioStream as Readable)) { chunks.push(chunk) }
    return Buffer.concat(chunks)
  }
}

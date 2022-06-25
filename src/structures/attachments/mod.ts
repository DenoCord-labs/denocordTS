import { encodeText } from "../../utils/encoders/mod.ts"
export class Attachment {
    name: string
    blob: Blob
    description: string

    constructor({ file, name, description }: {
        /**
         * Name of the Attachement
         */
        name: string
        /**
         * Description of the Attachment
         */
        description?: string
        /**
         * File Content
         * @example
         * const file = await Deno.readFile(`${Deno.cwd()}/assets/bot.jpg`)
         * const attachment = new Attachment({
         * name:"bot.jpg",
         * description:"cool pfp for bots",
         * file:new Blob([file])
         * })
         */
        file: Blob | Uint8Array | string,
    }
    ) {
        this.name = name
        this.blob = typeof file === "string" ? new Blob([encodeText(file)]) : file instanceof Uint8Array ? new Blob([file]) : file
        this.description = description || ""
    }

}

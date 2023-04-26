import { fileURLToPath } from "url"
import { dirname } from "path"

export const _filename = fileURLToPath(import.meta.url)//url con el nombre del directorio
export const _dirname = dirname(_filename)//la url
#!/usr/bin/env zx
import 'zx/globals'
import fastFolderSize from 'fast-folder-size'
import prettyBytes from 'pretty-bytes'
import { promisify } from 'util'

const fastFolderSizeAsync = promisify(fastFolderSize)

const mp3s = await glob('./input/*.mp3')

console.log(mp3s)

await fs.ensureDir('./output')

const compress = (file) => {
  const name = path.basename(file)
  return $`ffmpeg -i ${file} -map 0:a:0 -b:a 96k ./output/${name} -y`
}

const all = []
for (const mp3 of mp3s) {
  all.push(compress(mp3))
}

await Promise.all(all)

const fromSize = prettyBytes(await fastFolderSizeAsync('./input'))
const toSize = prettyBytes(await fastFolderSizeAsync('./output'))

console.log(`${fromSize} -> ${toSize}`)

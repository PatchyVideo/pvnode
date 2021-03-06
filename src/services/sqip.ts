import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import { unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { sqip, SqipResult } from 'sqip'

export default function (app: FastifyInstance, opts: FastifyPluginOptions, done: (err?: FastifyError) => void): void {
  app.post('/process', async (req, res) => {
    const image = req.body as Buffer
    if (!image)
      return res.code(400).send({
        error: 'No image provided',
      })
    if (typeof image === 'string')
      return res.code(502).send({
        error: 'Image is not a buffer',
      })

    const ext = req.headers['content-type']?.split('/')[1] === 'jpeg' ? 'jpg' : 'png'
    const filename = `sqip-${Math.random().toString(36).substring(2, 15)}.${ext}`
    const file = join('/tmp', filename)

    await writeFile(file, image)

    const sq = (await sqip({
      input: file,
      plugins: ['primitive', 'svgo', 'data-uri'],
    })) as SqipResult

    await unlink(file)

    res
      .code(200)
      .type('application/json')
      .send(
        JSON.stringify({
          status: 'success',
          content: sq.content.toString('utf-8'),
          dataURI: sq.metadata.dataURI,
        })
      )
  })
  done()
}

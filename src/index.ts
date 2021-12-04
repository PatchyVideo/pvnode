import fastify from 'fastify'

const app = fastify({
  logger: true,
})

import fastifyCompress from 'fastify-compress'
app.register(fastifyCompress)

app.addContentTypeParser('image/jpeg', { parseAs: 'buffer' }, function (req, body, done) {
  done(null, body)
})

import serviceSQIP from './services/sqip'
app.register(serviceSQIP, { prefix: '/sqip' })

const start = async () => {
  try {
    await app.listen(3000, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()

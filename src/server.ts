import { app } from '@/app'
import { env } from '@/libs/env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is works')
  })

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/inavalid-credentials.error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-usecase'

export class AuthenticateController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const Schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { email, password } = Schema.parse(request.body)

    try {
      const authenticateUseCase = makeAuthenticateUseCase()

      await authenticateUseCase.execute({
        email,
        password,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(409).send({ error: error.message })
      }

      return reply.status(400).send()
    }

    return reply.status(200).send()
  }
}

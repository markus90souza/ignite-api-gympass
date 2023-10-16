import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/inavalid-credentials-error'
import { compare } from 'bcrypt'
import { User } from '@prisma/client'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatched = await compare(password, user.password)

    if (!doesPasswordMatched) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}

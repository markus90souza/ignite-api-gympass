import { hash } from 'bcrypt'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import type { User } from '@prisma/client'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    name,
    password,
  }: RegisterRequest): Promise<RegisterResponse> {
    const password_hash = await hash(password, 8)

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return { user }
  }
}

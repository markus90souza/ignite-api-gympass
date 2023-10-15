import { hash } from 'bcrypt'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, name, password }: RegisterRequest) {
    const password_hash = await hash(password, 8)

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })
  }
}

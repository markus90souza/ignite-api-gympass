import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase
describe('REGISTER USE CASE', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John doe',
      email: 'test2@email.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John doe',
      email: 'test2@email.com',
      password: '12345678',
    })

    const isPasswortCorrectlyHashed = await compare('12345678', user.password)

    expect(isPasswortCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'test2@email.com'

    await sut.execute({
      name: 'John doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

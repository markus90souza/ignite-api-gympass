import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('REGISTER USE CASE', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const usersUseCase = new RegisterUseCase(usersRepository)

    const { user } = await usersUseCase.execute({
      name: 'John doe',
      email: 'test2@email.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const usersUseCase = new RegisterUseCase(usersRepository)

    const { user } = await usersUseCase.execute({
      name: 'John doe',
      email: 'test2@email.com',
      password: '12345678',
    })

    const isPasswortCorrectlyHashed = await compare('12345678', user.password)

    expect(isPasswortCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const usersUseCase = new RegisterUseCase(usersRepository)

    const email = 'test2@email.com'

    await usersUseCase.execute({
      name: 'John doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      usersUseCase.execute({
        name: 'John doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

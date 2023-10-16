import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/inavalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
describe('AUTHENTICATE USE CASE', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John doe',
      email: 'test2@email.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      email: 'test2@email.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test2@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate wrong password', async () => {
    await usersRepository.create({
      name: 'John doe',
      email: 'test2@email.com',
      password: await hash('12345678', 8),
    })

    await expect(() =>
      sut.execute({
        email: 'test2@email.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

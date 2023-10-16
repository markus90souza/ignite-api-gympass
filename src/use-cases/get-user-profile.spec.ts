import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { InvalidCredentialsError } from './errors/inavalid-credentials.error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('GET USER PROFILE USE CASE', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'John doe',
      email: 'test2@email.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
    })

    expect(user.id).toEqual(expect.any(String))

    expect(user.name).toEqual('John doe')
  })

  it('should not be able to get user pr0file wrong id ', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-found-userId',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

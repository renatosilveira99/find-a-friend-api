import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { CreateSessionUseCase } from '../session'

export function makeCreateSessionUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const createSessionUseCase = new CreateSessionUseCase(organizationsRepository)

  return createSessionUseCase
}

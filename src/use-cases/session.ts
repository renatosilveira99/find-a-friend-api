import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface CreateSessionUseCaseRequest {
  email: string
  password: string
}

interface CreateSessionUseCaseResponse {
  organization: Organization
}

export class CreateSessionUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new Error('Email/password does not match')
    }

    if (organization.password !== password) {
      throw new Error('Email/password does not match')
    }

    return {
      organization,
    }
  }
}

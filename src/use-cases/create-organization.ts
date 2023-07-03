import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  zip_code: string
  city: string
  address: string
  whatsapp: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    zip_code,
    city,
    address,
    whatsapp,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.create({
      name,
      email,
      zip_code,
      city,
      address,
      whatsapp,
      password,
    })

    return { organization }
  }
}

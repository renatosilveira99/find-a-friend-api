import { Organization, Prisma } from '@prisma/client'

import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.email === email,
    )

    return organization || null
  }

  async findManyByCity(city: string): Promise<Organization[] | null> {
    const organizations = this.items.filter(
      (organization) => organization.city === city,
    )

    return organizations || null
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.id === id,
    )

    return organization || null
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization: Organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      zip_code: data.zip_code,
      city: data.city,
      address: data.address,
      whatsapp: data.whatsapp,
      password: data.password,
    }

    this.items.push(organization)

    return organization
  }
}

import { Organization, Prisma } from '@prisma/client'

import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization || null
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({ where: { id } })

    return organization || null
  }

  async findManyByCity(city: string): Promise<Organization[] | null> {
    const organization = await prisma.organization.findMany({
      where: {
        city,
      },
    })

    return organization || null
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        email: data.email,
        zip_code: data.zip_code,
        city: data.city,
        address: data.address,
        whatsapp: data.whatsapp,
        password: data.password,
      },
    })

    return organization
  }
}

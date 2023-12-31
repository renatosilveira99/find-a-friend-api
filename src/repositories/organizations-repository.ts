import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findManyByCity(city: string): Promise<Organization[] | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}

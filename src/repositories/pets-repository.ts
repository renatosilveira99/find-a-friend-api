import { Pet, Prisma } from '@prisma/client'

export interface IPetFindParams {
  age?: string
  energyLevel?: string
  size?: string
  independencyLevel?: string
  organizationId: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findBy(data: IPetFindParams): Promise<Pet[] | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByOrganizationIds(organizationIds: string[]): Promise<Pet[] | null>
}

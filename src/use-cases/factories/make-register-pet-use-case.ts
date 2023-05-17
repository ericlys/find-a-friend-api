import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(prismaPetsRepository)

  return useCase
}

import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(prismaPetsRepository)

  return registerPetUseCase
}

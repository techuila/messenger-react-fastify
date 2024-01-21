/* eslint-disable @typescript-eslint/no-explicit-any */
/* c8 ignore next 999 */
import { uuid } from 'uuidv4'

export function GenerateHashId(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]) {
    const entity = args[0]
    entity.hashId = uuid()
    args[0] = entity

    const result = await originalMethod.apply(this, args)
    return result
  }

  return descriptor
}

export type User = {
  id?: number
  hashId?: string
  sub: string
  name: string
  email: string
  photoUrl?: string
  status?: Status
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export enum Status {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

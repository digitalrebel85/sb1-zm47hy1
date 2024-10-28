export interface Location {
  city: string
  region: string
  address?: string
}

export interface Advisor {
  id: number | string
  name: string
  company: string
  type: string
  location: Location
  phone: string
  website?: string
  description: string
  openingHours?: string
  specialties: string[]
  rating?: number
  reviews?: number
  image?: string
}

export interface SearchParams {
  type?: string
  city?: string
  service?: string
  query?: string
  page?: number
  limit?: number
}

export interface SearchResponse {
  results: Advisor[]
  total: number
  hasMore: boolean
  page: number
  error?: boolean
  message?: string
}

export interface City {
  name: string
  count: number
  region: string
}

export interface AdvisorType {
  slug: string
  title: string
  description: string
  icon: string
}
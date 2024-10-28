"use server"

import { City } from "@/lib/types"

export async function getCities(advisorType?: string): Promise<City[]> {
  try {
    // In a real app, this would be a database query
    return mockCities.filter(city => {
      if (!advisorType) return true
      return city.count > 0
    })
  } catch (error) {
    console.error("Error fetching cities:", error)
    throw new Error("Failed to fetch cities")
  }
}

const mockCities: City[] = [
  {
    name: "London",
    count: 150,
    region: "Greater London"
  },
  {
    name: "Manchester",
    count: 85,
    region: "Greater Manchester"
  },
  {
    name: "Birmingham",
    count: 92,
    region: "West Midlands"
  },
  {
    name: "Edinburgh",
    count: 67,
    region: "Scotland"
  },
  {
    name: "Glasgow",
    count: 58,
    region: "Scotland"
  },
  {
    name: "Liverpool",
    count: 45,
    region: "Merseyside"
  }
]
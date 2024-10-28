"use server"

import { revalidatePath } from "next/cache"
import { Advisor, SearchParams } from "@/lib/types"
import { db } from "@/lib/db"

export async function getAdvisors(params: SearchParams): Promise<{
  advisors: Advisor[]
  total: number
}> {
  try {
    const { city, type, query, page = 1, limit = 9 } = params
    const offset = (page - 1) * limit

    // In a real app, this would be a database query
    const advisors = mockAdvisors.filter(advisor => {
      if (city && advisor.location.city.toLowerCase() !== city.toLowerCase()) return false
      if (type && !advisor.specialties.includes(type)) return false
      if (query) {
        const searchStr = `${advisor.name} ${advisor.company} ${advisor.specialties.join(" ")}`.toLowerCase()
        if (!searchStr.includes(query.toLowerCase())) return false
      }
      return true
    })

    return {
      advisors: advisors.slice(offset, offset + limit),
      total: advisors.length
    }
  } catch (error) {
    console.error("Error fetching advisors:", error)
    throw new Error("Failed to fetch advisors")
  }
}

export async function getAdvisorById(id: number): Promise<Advisor | null> {
  try {
    return mockAdvisors.find(advisor => advisor.id === id) || null
  } catch (error) {
    console.error("Error fetching advisor:", error)
    throw new Error("Failed to fetch advisor")
  }
}

// Mock data - replace with actual database in production
const mockAdvisors: Advisor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Premier Financial Advisors",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    phone: "+44 20 7123 4567",
    email: "sarah.johnson@premierfinancial.com",
    specialties: ["mortgage", "insurance"],
    experience: 12,
    qualifications: ["CeMAP", "DipFA"],
    location: {
      city: "London",
      region: "Greater London",
      postcode: "EC1A 1BB"
    }
  },
  // Add more mock advisors...
]
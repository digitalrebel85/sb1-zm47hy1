import { Advisor, AdvisorType } from "./types"

// Mock data for static generation
const advisors: Advisor[] = [
  {
    id: 1,
    name: "John Smith",
    company: "London Mortgage Solutions",
    type: "mortgage",
    location: {
      city: "London",
      region: "Greater London"
    },
    phone: "+44 20 1234 5678",
    website: "https://example.com",
    description: "Experienced mortgage advisor with over 15 years in the industry. Specializing in first-time buyers and buy-to-let mortgages.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["First Time Buyers", "Buy to Let", "Remortgage"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Manchester Financial Services",
    type: "mortgage",
    location: {
      city: "Manchester",
      region: "Greater Manchester"
    },
    phone: "+44 161 234 5678",
    website: "https://example.com",
    description: "Award-winning mortgage advisor helping families find their dream homes. Expert in residential and commercial mortgages.",
    openingHours: "Monday - Friday: 9:00 - 18:00",
    specialties: ["Residential Mortgages", "Commercial Mortgages", "First Time Buyers"]
  },
  {
    id: 3,
    name: "David Williams",
    company: "London Insurance Group",
    type: "insurance",
    location: {
      city: "London",
      region: "Greater London"
    },
    phone: "+44 20 2345 6789",
    website: "https://example.com",
    description: "Comprehensive insurance solutions for individuals and businesses. Specializing in life, health, and property insurance.",
    openingHours: "Monday - Friday: 8:30 - 17:00",
    specialties: ["Life Insurance", "Health Insurance", "Property Insurance"]
  },
  {
    id: 4,
    name: "Emma Brown",
    company: "Birmingham Financial Advisors",
    type: "financial",
    location: {
      city: "Birmingham",
      region: "West Midlands"
    },
    phone: "+44 121 345 6789",
    website: "https://example.com",
    description: "Certified financial planner offering personalized investment and retirement planning services.",
    openingHours: "Monday - Friday: 9:00 - 17:00",
    specialties: ["Investment Planning", "Retirement Planning", "Estate Planning"]
  },
  {
    id: 5,
    name: "Michael Chen",
    company: "Manchester Insurance Solutions",
    type: "insurance",
    location: {
      city: "Manchester",
      region: "Greater Manchester"
    },
    phone: "+44 131 456 7890",
    website: "https://example.com",
    description: "Specialized in health and life insurance solutions. Helping individuals and families protect what matters most.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["Health Insurance", "Life Insurance", "Critical Illness Cover"]
  }
]

const advisorTypes: AdvisorType[] = [
  {
    slug: "mortgage",
    title: "Mortgage Advisors",
    description: "Find expert mortgage advisors to guide you through the home buying process",
    icon: "home"
  },
  {
    slug: "insurance",
    title: "Insurance Advisors",
    description: "Connect with insurance professionals to protect what matters most",
    icon: "shield"
  },
  {
    slug: "financial",
    title: "Financial Advisors",
    description: "Get expert guidance on financial planning and investments",
    icon: "briefcase"
  }
]

export async function getAdvisorById(id: number): Promise<Advisor | undefined> {
  return advisors.find(advisor => advisor.id === id)
}

export async function getAllAdvisors(): Promise<Advisor[]> {
  return advisors
}

export async function getAdvisorsByType(type: string): Promise<Advisor[]> {
  return advisors.filter(advisor => advisor.type === type.toLowerCase())
}

export async function getAdvisorsByCity(city: string): Promise<Advisor[]> {
  return advisors.filter(advisor => 
    advisor.location.city.toLowerCase() === city.toLowerCase()
  )
}

export async function searchAdvisors(params: {
  type?: string
  city?: string
  service?: string
  query?: string
}): Promise<Advisor[]> {
  return advisors.filter(advisor => {
    // Type filter
    if (params.type && advisor.type !== params.type.toLowerCase()) {
      return false
    }

    // City filter
    if (params.city && advisor.location.city.toLowerCase() !== params.city.toLowerCase()) {
      return false
    }

    // Service filter
    if (params.service) {
      const normalizedService = params.service.toLowerCase().replace(/-/g, ' ')
      const hasService = advisor.specialties.some(specialty => 
        specialty.toLowerCase() === normalizedService
      )
      if (!hasService) return false
    }

    // Query filter
    if (params.query) {
      const searchStr = `${advisor.name} ${advisor.company} ${advisor.description} ${advisor.specialties.join(" ")}`.toLowerCase()
      if (!searchStr.includes(params.query.toLowerCase())) {
        return false
      }
    }

    return true
  })
}

export async function getAdvisorType(slug: string): Promise<AdvisorType | undefined> {
  return advisorTypes.find(type => type.slug === slug.toLowerCase())
}

export async function getAllAdvisorTypes(): Promise<AdvisorType[]> {
  return advisorTypes
}
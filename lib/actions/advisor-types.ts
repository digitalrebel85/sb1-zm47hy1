"use server"

import { AdvisorType } from "@/lib/types"

export async function getAdvisorTypes(): Promise<AdvisorType[]> {
  return [
    {
      slug: "mortgage",
      name: "Mortgage Advisor",
      description: "Expert guidance through the home buying process"
    },
    {
      slug: "insurance",
      name: "Insurance Advisor",
      description: "Professional advice on protecting what matters most"
    },
    {
      slug: "financial",
      name: "Financial Advisor",
      description: "Comprehensive financial planning and wealth management"
    }
  ]
}

export async function getAdvisorType(slug: string): Promise<AdvisorType | null> {
  const types = await getAdvisorTypes()
  return types.find(type => type.slug === slug) || null
}
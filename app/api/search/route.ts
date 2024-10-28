import { NextResponse } from "next/server"
import { searchAdvisors } from "@/lib/valueserp"
import { SearchResponse } from "@/lib/types"

export const dynamic = "force-dynamic"
export const runtime = "edge"

const DEFAULT_RESPONSE: SearchResponse = {
  results: [],
  total: 0,
  hasMore: false,
  page: 1
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const city = searchParams.get("city")
    const page = parseInt(searchParams.get("page") || "1")

    if (!type || !city) {
      return NextResponse.json(DEFAULT_RESPONSE)
    }

    const results = await searchAdvisors({ type, city, page })
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { 
        ...DEFAULT_RESPONSE,
        error: true,
        message: error instanceof Error ? error.message : "Failed to fetch advisors"
      },
      { status: 200 }
    )
  }
}
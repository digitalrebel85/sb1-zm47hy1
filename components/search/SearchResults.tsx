"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Advisor, SearchResponse } from "@/lib/types"
import { AdvisorCard } from "@/components/advisor/AdvisorCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { SearchEmptyState } from "./SearchEmptyState"

export function SearchResults() {
  const searchParams = useSearchParams()
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const type = searchParams.get("type")
  const city = searchParams.get("city")

  useEffect(() => {
    if (type && city) {
      setPage(1)
      setAdvisors([])
      fetchResults(1)
    } else {
      setAdvisors([])
      setHasMore(false)
      setLoading(false)
      setError(null)
    }
  }, [type, city])

  const fetchResults = async (pageNum: number) => {
    if (!type || !city) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ type, city, page: pageNum.toString() })
      const response = await fetch(`/api/search?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }

      const data: SearchResponse = await response.json()

      if (data.error) {
        throw new Error(data.message || "Failed to fetch results")
      }

      setAdvisors(prev => pageNum === 1 ? data.results : [...prev, ...data.results])
      setHasMore(data.hasMore)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load advisors")
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setPage(1)
    setAdvisors([])
    fetchResults(1)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchResults(nextPage)
  }

  if (!type || !city) {
    return <SearchEmptyState />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="ml-4"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (loading && advisors.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!loading && advisors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
        <p className="text-muted-foreground">
          No advisors found for {type} in {city}. Try adjusting your search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {advisors.map((advisor) => (
          <AdvisorCard key={advisor.id} advisor={advisor} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
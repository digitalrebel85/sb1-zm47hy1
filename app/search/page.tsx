import { Suspense } from "react"
import { SearchFilters } from "@/components/search/SearchFilters"
import { SearchResults } from "@/components/search/SearchResults"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Find Your Advisor
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Use the filters below to find the perfect advisor for your needs
          </p>
        </div>

        <SearchFilters />

        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}

function SearchSkeleton() {
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
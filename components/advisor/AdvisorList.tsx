import { Advisor } from "@/lib/types"
import { AdvisorCard } from "./AdvisorCard"

interface AdvisorListProps {
  advisors: Advisor[]
}

export function AdvisorList({ advisors }: AdvisorListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {advisors.map((advisor) => (
        <AdvisorCard key={advisor.id} advisor={advisor} />
      ))}
    </div>
  )
}
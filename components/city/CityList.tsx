import Link from "next/link"
import { MapPin } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AdvisorType, City } from "@/lib/types"

interface CityListProps {
  cities: City[]
  advisorType: AdvisorType
}

export function CityList({ cities, advisorType }: CityListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <Link
          key={city.id}
          href={`/${advisorType.id}/${city.id}`}
          className="block transition-transform hover:scale-105"
        >
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>{city.name}</CardTitle>
                  <CardDescription>
                    {city.region} • {city.advisorCount} advisors
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
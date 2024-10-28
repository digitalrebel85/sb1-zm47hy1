import { MapPinIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CityCardProps {
  city: {
    name: string
    count: number
  }
  advisorType: string
}

export function CityCard({ city, advisorType }: CityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          {city.name}
        </CardTitle>
        <CardDescription>{city.count} advisors available</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/${advisorType}/${city.name.toLowerCase()}`}>
          <Button variant="outline" className="w-full">
            View Advisors
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Advisor } from "@/lib/types"

interface AdvisorCardProps {
  advisor: Advisor
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {advisor.image && (
            <Image
              src={advisor.image}
              alt={advisor.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <CardTitle className="text-xl">{advisor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{advisor.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-2">
          {typeof advisor.rating === 'number' && typeof advisor.reviews === 'number' && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{advisor.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({advisor.reviews} reviews)
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {advisor.location.address || `${advisor.location.city}, ${advisor.location.region}`}
            </span>
          </div>
          {advisor.openingHours && (
            <p className="text-sm text-muted-foreground">
              {advisor.openingHours}
            </p>
          )}
        </div>

        {advisor.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {advisor.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 mt-auto pt-4">
          {advisor.phone && (
            <Button className="w-full" variant="outline" asChild>
              <a href={`tel:${advisor.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                {advisor.phone}
              </a>
            </Button>
          )}
          <Button className="w-full" asChild>
            <Link href={`/${advisor.type}/${advisor.location.city.toLowerCase()}/${advisor.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
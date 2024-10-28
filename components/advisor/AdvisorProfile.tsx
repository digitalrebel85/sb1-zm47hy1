import { MapPin, Phone, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Advisor } from "@/lib/types"

interface AdvisorProfileProps {
  advisor: Advisor
}

export function AdvisorProfile({ advisor }: AdvisorProfileProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-2xl">{advisor.name}</CardTitle>
          {advisor.company && (
            <p className="text-lg text-muted-foreground">{advisor.company}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {advisor.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>
                {advisor.location.city}, {advisor.location.region}
              </span>
            </div>
          )}
          {advisor.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <a 
                href={`tel:${advisor.phone}`} 
                className="text-primary hover:underline"
              >
                {advisor.phone}
              </a>
            </div>
          )}
          {advisor.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <a
                href={advisor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        {advisor.description && (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p>{advisor.description}</p>
          </div>
        )}

        {advisor.specialties && advisor.specialties.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {advisor.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {advisor.openingHours && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
            <p className="text-sm text-muted-foreground">
              {advisor.openingHours}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
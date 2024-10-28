import Image from "next/image"
import { PhoneIcon, StarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AdvisorCardProps {
  advisor: {
    id: number
    name: string
    company: string
    rating: number
    reviews: number
    image: string
    phone: string
  }
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={advisor.image}
            alt={advisor.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-xl">{advisor.name}</CardTitle>
            <CardDescription>{advisor.company}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="font-medium">{advisor.rating}</span>
          <span className="text-gray-500">({advisor.reviews} reviews)</span>
        </div>
        <Button className="w-full" variant="outline">
          <PhoneIcon className="mr-2 h-4 w-4" />
          {advisor.phone}
        </Button>
        <Button className="w-full">Book Consultation</Button>
      </CardContent>
    </Card>
  )
}
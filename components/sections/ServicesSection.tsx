import { BriefcaseIcon, HomeIcon, ShieldCheckIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: HomeIcon,
    title: "Mortgage Advisors",
    description: "Find experts to guide you through the home buying process.",
    type: "mortgage",
  },
  {
    icon: ShieldCheckIcon,
    title: "Insurance Advisors",
    description: "Protect what matters most with professional advice.",
    type: "insurance",
  },
  {
    icon: BriefcaseIcon,
    title: "Financial Advisors",
    description: "Plan your financial future with expert guidance.",
    type: "financial",
  },
]

export function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="services">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Our Services
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="bg-background">
              <CardHeader>
                <service.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/search?type=${service.type}`}>
                    Find {service.title.slice(0, -1)}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
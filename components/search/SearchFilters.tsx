"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  type: z.string().optional(),
  city: z.string().optional(),
  service: z.string().optional(),
})

const advisorTypes = [
  { value: "mortgage", label: "Mortgage Advisor" },
  { value: "insurance", label: "Insurance Advisor" },
  { value: "financial", label: "Financial Advisor" },
]

const cities = [
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "edinburgh", label: "Edinburgh" },
  { value: "glasgow", label: "Glasgow" },
  { value: "liverpool", label: "Liverpool" },
]

const services = {
  mortgage: [
    { value: "first-time-buyers", label: "First Time Buyers" },
    { value: "remortgage", label: "Remortgage" },
    { value: "buy-to-let", label: "Buy to Let" },
    { value: "commercial", label: "Commercial" },
  ],
  insurance: [
    { value: "life-insurance", label: "Life Insurance" },
    { value: "health-insurance", label: "Health Insurance" },
    { value: "property-insurance", label: "Property Insurance" },
    { value: "business-insurance", label: "Business Insurance" },
  ],
  financial: [
    { value: "investment-planning", label: "Investment Planning" },
    { value: "retirement-planning", label: "Retirement Planning" },
    { value: "estate-planning", label: "Estate Planning" },
    { value: "tax-planning", label: "Tax Planning" },
  ],
}

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: searchParams.get("type") || "",
      city: searchParams.get("city") || "",
      service: searchParams.get("service") || "",
    },
  })

  const selectedType = form.watch("type") as keyof typeof services

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams()
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advisor Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {advisorTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedType}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedType &&
                      services[selectedType].map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Search Advisors
        </Button>
      </form>
    </Form>
  )
}
"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const advisorTypes = [
  { value: "mortgage", label: "Mortgage" },
  { value: "insurance", label: "Insurance" },
  { value: "financial", label: "Financial" },
]

const cities = [
  "London",
  "Manchester",
  "Birmingham",
  "Edinburgh",
  "Glasgow",
  "Liverpool",
]

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [type, setType] = useState(searchParams.get("type") || "")
  const [city, setCity] = useState(searchParams.get("city") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (type) params.set("type", type)
    if (city) params.set("city", city)

    startTransition(() => {
      router.push(`/search?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search advisors..."
        className="w-full md:w-[200px]"
      />
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {advisorTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city.toLowerCase()}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={isPending}>
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
import Link from "next/link"
import { ShieldCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { SearchBar } from "@/components/search/SearchBar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <ShieldCheckIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Find an Advisor
            </span>
          </Link>
          <NavigationMenu />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  )
}
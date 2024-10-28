import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}
import Link from "next/link"

const navigationItems = [
  { href: "/search?type=mortgage", label: "Mortgage" },
  { href: "/search?type=insurance", label: "Insurance" },
  { href: "/search?type=financial", label: "Financial" },
]

export function NavigationMenu() {
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
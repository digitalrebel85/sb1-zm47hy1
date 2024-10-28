import Link from "next/link"

const footerSections = {
  "About Us": [
    { href: "/about", label: "Our Story" },
    { href: "/team", label: "Our Team" },
    { href: "/careers", label: "Careers" },
  ],
  "Services": [
    { href: "/mortgage", label: "Mortgage" },
    { href: "/insurance", label: "Insurance" },
    { href: "/financial", label: "Financial" },
  ],
  "Resources": [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "Support" },
  ],
  "Legal": [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
}

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title} className="space-y-2">
              <h4 className="text-lg font-semibold">{title}</h4>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-sm hover:underline" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          © {new Date().getFullYear()} Find an Advisor. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
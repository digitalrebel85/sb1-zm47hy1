import { notFound } from "next/navigation"
import { getAdvisorType, getAllAdvisorTypes, getAdvisorsByType } from "@/lib/data"
import { AdvisorList } from "@/components/advisor/AdvisorList"
import { PageHeader } from "@/components/ui/page-header"

interface PageProps {
  params: {
    advisorType: string
  }
}

export default async function AdvisorTypePage({ params }: PageProps) {
  const advisorType = await getAdvisorType(params.advisorType)
  const advisors = await getAdvisorsByType(params.advisorType)

  if (!advisorType) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6">
      <PageHeader
        title={advisorType.title}
        description={advisorType.description}
      />
      <AdvisorList advisors={advisors} />
    </div>
  )
}

export async function generateStaticParams() {
  const advisorTypes = await getAllAdvisorTypes()
  return advisorTypes.map((type) => ({
    advisorType: type.slug,
  }))
}
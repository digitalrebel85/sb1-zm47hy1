interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
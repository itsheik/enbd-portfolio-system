type LayoutProps = {
   children: React.ReactNode
   params: { section: string }
}

export default function Layout({ children }: LayoutProps) {
   return <div className="bg-background">{children}</div>
}

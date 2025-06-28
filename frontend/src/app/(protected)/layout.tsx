import { DashboardLayout } from '~/components/sections/dashboard/DashboardLayout'

type LayoutProps = {
   children: React.ReactNode
   params: { section: string }
}

export default function Layout({ children }: LayoutProps) {
   return <DashboardLayout>{children}</DashboardLayout>
}

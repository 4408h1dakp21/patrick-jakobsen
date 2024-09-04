'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Home, Building2, Users, FileText, Settings, Menu, Search, Bell, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { UserButton } from "@clerk/nextjs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Building2, label: "Properties", href: "/properties" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: FileText, label: "Contracts", href: "/contracts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-white dark:bg-gray-800 md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
              <Home className="h-6 w-6" />
              <span>Real Estate CMS</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                      pathname === item.href
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    href={item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 dark:bg-gray-800 lg:h-[56px]">
          <Button className="lg:hidden" size="icon" variant="ghost">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-gray-100 pl-8 dark:bg-gray-900"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <Button className="rounded-full" size="icon" variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <UserButton />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

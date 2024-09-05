'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Home,
    Building2,
    Users,
    FileText,
    Settings,
    Menu,
    Search,
    Sun,
    Moon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { UserButton } from '@clerk/nextjs'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Definér navigationselementer
    const navItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard/dashboard' },
        { icon: Building2, label: 'Ejendomme', href: '/dashboard/properties' },
        { icon: Users, label: 'Klienter', href: '/dashboard/clients' },
        { icon: FileText, label: 'Kontrakter', href: '/dashboard/contracts' },
    ]

    // Sidebar-komponent
    const Sidebar = () => (
        <div className="flex h-full flex-col bg-white dark:bg-gray-800">
            <div className="flex h-14 items-center border-b px-4">
                <Link
                    className="flex items-center gap-2 font-semibold"
                    href="/dashboard"
                >
                    <Home className="h-6 w-6" />
                    <span>Ejendomsmægler CMS</span>
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50 ${
                                    pathname === item.href
                                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 border-r border-gray-200 dark:border-gray-700 md:block">
                <Sidebar />
            </aside>

            {/* Mobil Sidebar */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Hovedindhold */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navigationslinje */}
                <header className="flex h-14 items-center gap-4 border-b bg-white px-4 dark:bg-gray-800 lg:h-[60px]">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                className="md:hidden"
                                size="icon"
                                variant="ghost"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">
                                    Vis/skjul sidebar
                                </span>
                            </Button>
                        </SheetTrigger>
                    </Sheet>
                    <div className="flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    className="w-full max-w-[400px] bg-gray-100 pl-8 dark:bg-gray-700"
                                    placeholder="Søg..."
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <Button
                        className="rounded-full"
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                        <span className="sr-only">Skift tema</span>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                </header>

                {/* Hovedindholdsområde */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

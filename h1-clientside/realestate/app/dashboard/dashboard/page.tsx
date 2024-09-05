'use client'

// Importér nødvendige komponenter og ikoner fra forskellige biblioteker
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from '@/components/ui/table'
import { Building2, Home, Users, FileText } from 'lucide-react'

// Definerer typen 'Property' (Ejendom) som beskriver en ejendom
type Property = {
    _id: string
    address: string // Adresse
    price: number // Pris
    type: string // Type (fx hus, lejlighed)
    status: string // Status (fx til salg, solgt)
}

// DashboardPage er standardeksport-funktionen for denne side
export default function DashboardPage() {
    // Hent statistikker og nyligt oprettede ejendomme fra API'en
    const dashboardStats = useQuery(api.dashboard.getStats)
    const recentProperties = useQuery(api.dashboard.getRecentProperties)

    // Hvis dataene ikke er indlæst endnu, vises en "Loading..." tekst
    if (!dashboardStats || !recentProperties) {
        return <div>Indlæser...</div>
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Kontrolpanel</h1>{' '}
            {/* Overskrift til dashboard */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Kort 1: Total antal ejendomme */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Samlet Antal Ejendomme {/* Total Properties */}
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />{' '}
                        {/* Ikon */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardStats.totalProperties}{' '}
                            {/* Vis det samlede antal ejendomme */}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardStats.totalPropertiesChange}% siden sidste
                            måned
                        </p>
                    </CardContent>
                </Card>

                {/* Kort 2: Aktive opslag */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Aktive Opslag {/* Active Listings */}
                        </CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />{' '}
                        {/* Ikon */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardStats.activeListings}{' '}
                            {/* Vis antallet af aktive opslag */}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardStats.activeListingsChange}% siden sidste
                            måned
                        </p>
                    </CardContent>
                </Card>

                {/* Kort 3: Nye kunder */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Nye Kunder {/* New Clients */}
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />{' '}
                        {/* Ikon */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardStats.newClients}{' '}
                            {/* Vis antallet af nye kunder */}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardStats.newClientsChange}% siden sidste
                            måned
                        </p>
                    </CardContent>
                </Card>

                {/* Kort 4: Underskrevne kontrakter */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Underskrevne Kontrakter {/* Contracts Signed */}
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />{' '}
                        {/* Ikon */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardStats.contractsSigned}{' '}
                            {/* Vis antallet af underskrevne kontrakter */}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardStats.contractsSignedChange}% siden sidste
                            måned
                        </p>
                    </CardContent>
                </Card>
            </div>
            {/* Tabel over nyligt oprettede ejendomme */}
            <Card>
                <CardHeader>
                    <CardTitle>Seneste Ejendomsopslag</CardTitle>{' '}
                    {/* Recent Property Listings */}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Adresse</TableHead> {/* Address */}
                                <TableHead>Pris</TableHead> {/* Price */}
                                <TableHead>Type</TableHead> {/* Type */}
                                <TableHead>Status</TableHead> {/* Status */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Gennemløb alle nyligt oprettede ejendomme og vis dem i tabellen */}
                            {recentProperties.map((property: Property) => (
                                <TableRow key={property._id}>
                                    <TableCell>{property.address}</TableCell>{' '}
                                    {/* Adresse */}
                                    <TableCell>
                                        {property.price.toLocaleString()} kr.{' '}
                                        {/* Pris */}
                                    </TableCell>
                                    <TableCell>{property.type}</TableCell>{' '}
                                    {/* Type */}
                                    <TableCell>
                                        {property.status}
                                    </TableCell>{' '}
                                    {/* Status */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

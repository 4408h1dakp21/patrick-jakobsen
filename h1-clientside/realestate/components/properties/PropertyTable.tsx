import React from 'react'
import { Id } from '@/convex/_generated/dataModel'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, ArrowUpDown } from 'lucide-react'
import { Property, PropertyFormData } from '@/types'
import { Badge } from '@/components/ui/badge'

// PropertyTable-komponenten til visning af ejendomme i tabelform
export const PropertyTable: React.FC<{
    properties: Property[]
    onEdit: (property: Property) => void
    onDelete: (id: Id<'properties'>) => void
    sortField: keyof PropertyFormData | null
    sortDirection: 'asc' | 'desc'
    onSort: (field: keyof PropertyFormData) => void
}> = ({ properties, onEdit, onDelete, sortField, sortDirection, onSort }) => {
    // Funktion til at oversætte feltnavne til dansk
    const translateField = (field: string): string => {
        const translations: { [key: string]: string } = {
            address: 'Adresse',
            price: 'Pris',
            type: 'Type',
            status: 'Status',
        }
        return translations[field] || field
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {['address', 'price', 'type', 'status'].map((field) => (
                        <TableHead
                            key={field}
                            onClick={() =>
                                onSort(field as keyof PropertyFormData)
                            }
                            className="cursor-pointer"
                        >
                            {translateField(field)}{' '}
                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                    ))}
                    <TableHead>Mærker</TableHead>
                    <TableHead>Handlinger</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {properties.map((property) => (
                    <TableRow key={property._id}>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>
                            {property.price.toLocaleString()} kr.
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{property.status}</TableCell>
                        <TableCell>
                            {property.isNew && (
                                <Badge className="mr-2" variant="secondary">
                                    Ny
                                </Badge>
                            )}
                            {property.isTrending && (
                                <Badge variant="secondary">Populær</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                onClick={() => onEdit(property)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Rediger
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => onDelete(property._id)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Slet
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

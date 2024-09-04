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

export const PropertyTable: React.FC<{
    properties: Property[]
    onEdit: (property: Property) => void
    onDelete: (id: Id<'properties'>) => void
    sortField: keyof PropertyFormData | null
    sortDirection: 'asc' | 'desc'
    onSort: (field: keyof PropertyFormData) => void
}> = ({ properties, onEdit, onDelete, sortField, sortDirection, onSort }) => {
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
                            {field.charAt(0).toUpperCase() + field.slice(1)}{' '}
                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                    ))}
                    <TableHead>Tags</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {properties.map((property) => (
                    <TableRow key={property._id}>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>
                            ${property.price.toLocaleString()}
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{property.status}</TableCell>
                        <TableCell>
                            {property.isNew && (
                                <Badge className="mr-2" variant="secondary">
                                    New
                                </Badge>
                            )}
                            {property.isTrending && (
                                <Badge variant="secondary">Trending</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="ghost"
                                onClick={() => onEdit(property)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => onDelete(property._id)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

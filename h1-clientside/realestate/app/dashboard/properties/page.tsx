'use client'

import React, { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'react-hot-toast'
import { Id } from '@/convex/_generated/dataModel'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

import {
    ChevronDown,
    Plus,
    Search,
    Building2,
    SlidersHorizontal,
} from 'lucide-react'

import { PropertyForm } from '@/components/properties/PropertyForm'
import { PropertyTable } from '@/components/properties/PropertyTable'
import { Property, PropertyFormData } from '@/types'

export default function PropertiesPage() {
    // Hent ejendomme fra API'et eller returnér en tom liste, hvis ingen ejendomme findes
    const properties = useQuery(api.properties.getProperty) || []

    // State til at håndtere forskellige tilstande (åbne/lukke dialoger, redigering, sortering osv.)
    const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
    const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false)
    const [editingProperty, setEditingProperty] = useState<Property | null>(
        null
    )
    const [sortField, setSortField] = useState<keyof PropertyFormData | null>(
        null
    )
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    // Mutationer til at tilføje, redigere og slette ejendomme via API'et
    const addProperty = useMutation(api.properties.addProperty)
    const editProperty = useMutation(api.properties.editProperty)
    const deleteProperty = useMutation(api.properties.deleteProperty)

    // Håndtering af formularens indsendelse (tilføjelse/redigering af ejendom)
    const onSubmit = async (
        data: PropertyFormData,
        newStorageIds: string[],
        existingStorageIds: string[]
    ) => {
        try {
            const propertyData = {
                ...data,
                imageUrls: [...existingStorageIds, ...newStorageIds],
                isNew: data.isNew,
                isTrending: data.isTrending,
            }

            if (editingProperty) {
                await editProperty({
                    id: editingProperty._id,
                    ...propertyData,
                })
                toast.success('Ejendom opdateret med succes') // Success-besked ved opdatering
            } else {
                await addProperty(propertyData)
                toast.success('Ejendom tilføjet med succes') // Success-besked ved tilføjelse
            }
            setIsAddPropertyOpen(false)
            setIsEditPropertyOpen(false)
            setEditingProperty(null)
        } catch (error) {
            console.error('Fejl ved tilføjelse/redigering af ejendom:', error)
            if (error instanceof Error) {
                toast.error(`Fejl: ${error.message}`) // Fejlbesked ved fejl
            } else {
                toast.error('Ukendt fejl ved tilføjelse/redigering')
            }
        }
    }

    // Håndtering af ejendomsredigering (åbner redigeringsformularen)
    const handleEdit = (property: Property) => {
        setEditingProperty(property)
        setIsEditPropertyOpen(true)
    }

    // Håndtering af sletning af ejendom
    const handleDelete = async (id: Id<'properties'>) => {
        try {
            await deleteProperty({ id })
            toast.success('Ejendom slettet med succes') // Success-besked ved sletning
        } catch (error) {
            console.error('Fejl ved sletning af ejendom:', error)
            toast.error('Fejl ved sletning af ejendom') // Fejlbesked ved sletning
        }
    }

    // Håndtering af sortering (ændrer sorteringsretning ved klik på samme felt)
    const handleSort = (field: keyof PropertyFormData) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    // Filtrering af ejendomme baseret på søgning og statusfilter
    const filteredProperties = properties.filter(
        (property) =>
            property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === 'all' || property.status === statusFilter)
    )

    // Sortering af ejendomme baseret på valgt felt og sorteringsretning
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        if (!sortField) return 0
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    {/* Sideoverskrift med ikon */}
                    <div className="flex items-center space-x-4">
                        <Building2 className="h-10 w-10 text-primary" />
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            Ejendomme
                        </h1>
                    </div>
                    {/* Dialog til tilføjelse af ejendom */}
                    <Dialog
                        open={isAddPropertyOpen}
                        onOpenChange={setIsAddPropertyOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> Tilføj Ejendom
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Tilføj Ny Ejendom</DialogTitle>
                            </DialogHeader>
                            <PropertyForm onSubmit={onSubmit} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Kort til ejendomsliste */}
                <Card className="backdrop-blur-lg bg-white/50 dark:bg-gray-800/50 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Ejendomsliste
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Søgning og filtrering */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                            <div className="relative w-full md:w-1/2">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    className="pl-10 w-full"
                                    placeholder="Søg ejendomme..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center space-x-4 w-full md:w-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full md:w-auto"
                                        >
                                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                                            Filtrer efter Status
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuRadioGroup
                                            value={statusFilter}
                                            onValueChange={setStatusFilter}
                                        >
                                            <DropdownMenuRadioItem value="all">
                                                Alle
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="Active">
                                                Aktive
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="Pending">
                                                Afventer
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="Sold">
                                                Solgt
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Tabel over ejendomme */}
                        <div className="overflow-x-auto">
                            <PropertyTable
                                properties={sortedProperties}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog til redigering af ejendom */}
            <Dialog
                open={isEditPropertyOpen}
                onOpenChange={setIsEditPropertyOpen}
            >
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Rediger Ejendom</DialogTitle>
                    </DialogHeader>
                    <PropertyForm
                        onSubmit={onSubmit}
                        initialData={editingProperty || undefined}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

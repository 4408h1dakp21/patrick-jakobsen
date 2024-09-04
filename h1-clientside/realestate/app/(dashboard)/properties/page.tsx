'use client'

import React, { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { Id } from '@/convex/_generated/dataModel'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ChevronDown, Upload, X, Edit, Trash2, ArrowUpDown } from 'lucide-react'

const propertySchema = z.object({
    address: z.string().min(1, 'Address is required'),
    price: z.number().positive('Price must be positive'),
    type: z.string().min(1, 'Property type is required'),
    status: z.string().min(1, 'Status is required'),
    bedrooms: z.number().int().positive('Number of bedrooms must be positive'),
    bathrooms: z.number().positive('Number of bathrooms must be positive'),
    squareFootage: z.number().int().positive('Square footage must be positive'),
    description: z.string().min(1, 'Description is required'),
    imageUrls: z.array(z.string()).default([]),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface Property extends PropertyFormData {
    _id: Id<'properties'>
}

const PropertyForm: React.FC<{
    onSubmit: (data: PropertyFormData, files: File[]) => Promise<void>
    initialData?: Property
}> = ({ onSubmit, initialData }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: initialData || {
            address: '',
            price: 0,
            type: '',
            status: 'Active',
            bedrooms: 0,
            bathrooms: 0,
            squareFootage: 0,
            description: '',
            imageUrls: [],
        },
    })

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedFiles((prev) => [...prev, ...acceptedFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleFormSubmit = (data: PropertyFormData) => {
        onSubmit(data, uploadedFiles)
    }

    return (
        <ScrollArea className="h-[70vh] pr-4">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        name="address"
                        label="Address"
                        control={control}
                        errors={errors}
                    />
                    <FormField
                        name="price"
                        label="Price"
                        control={control}
                        errors={errors}
                        type="number"
                    />
                    <FormField
                        name="type"
                        label="Type"
                        control={control}
                        errors={errors}
                        as="select"
                        options={[
                            { value: 'House', label: 'House' },
                            { value: 'Apartment', label: 'Apartment' },
                            { value: 'Condo', label: 'Condo' },
                            { value: 'Townhouse', label: 'Townhouse' },
                        ]}
                    />
                    <FormField
                        name="status"
                        label="Status"
                        control={control}
                        errors={errors}
                        as="select"
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Sold', label: 'Sold' },
                        ]}
                    />
                    <FormField
                        name="bedrooms"
                        label="Bedrooms"
                        control={control}
                        errors={errors}
                        type="number"
                    />
                    <FormField
                        name="bathrooms"
                        label="Bathrooms"
                        control={control}
                        errors={errors}
                        type="number"
                    />
                    <FormField
                        name="squareFootage"
                        label="Square Footage"
                        control={control}
                        errors={errors}
                        type="number"
                    />
                </div>
                <FormField
                    name="description"
                    label="Description"
                    control={control}
                    errors={errors}
                    as="textarea"
                />
                <div className="space-y-2">
                    <Label>Images</Label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-md p-4 ${
                            isDragActive ? 'border-primary' : 'border-input'
                        }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            {isDragActive ? (
                                <p className="text-sm text-muted-foreground">
                                    Drop the files here ...
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Drag 'n' drop some files here, or click to
                                    select files
                                </p>
                            )}
                        </div>
                    </div>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium">
                                Uploaded files:
                            </h4>
                            <ul className="mt-2 space-y-2">
                                {uploadedFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                                    >
                                        <span className="text-sm truncate max-w-[200px]">
                                            {file.name}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Save Property
                </Button>
            </form>
        </ScrollArea>
    )
}

const FormField: React.FC<{
    name: keyof PropertyFormData
    label: string
    control: any
    errors: any
    type?: string
    as?: 'input' | 'select' | 'textarea'
    options?: { value: string; label: string }[]
}> = ({
    name,
    label,
    control,
    errors,
    type = 'text',
    as = 'input',
    options = [],
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    switch (as) {
                        case 'select':
                            return (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={`Select ${label.toLowerCase()}`}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        case 'textarea':
                            return <Textarea {...field} />
                        default:
                            return (
                                <Input
                                    {...field}
                                    type={type}
                                    onChange={(e) =>
                                        field.onChange(
                                            type === 'number'
                                                ? parseFloat(e.target.value)
                                                : e.target.value
                                        )
                                    }
                                />
                            )
                    }
                }}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name].message}</p>
            )}
        </div>
    )
}

const PropertyTable: React.FC<{
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

export default function PropertiesPage() {
    const properties = useQuery(api.properties.getProperty) || []
    const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
    const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false)
    const [editingProperty, setEditingProperty] = useState<Property | null>(
        null
    )
    const [sortField, setSortField] = useState<keyof PropertyFormData | null>(
        null
    )
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const addProperty = useMutation(api.properties.addProperty)
    const editProperty = useMutation(api.properties.editProperty)
    const deleteProperty = useMutation(api.properties.deleteProperty)

    const onSubmit = async (data: PropertyFormData, files: File[]) => {
        try {
            const newImageUrls = await Promise.all(files.map(uploadImage))
            const propertyData = {
                ...data,
                imageUrls: [...data.imageUrls, ...newImageUrls],
            }

            if (editingProperty) {
                await editProperty({
                    id: editingProperty._id,
                    ...propertyData,
                })
                toast.success('Property updated successfully')
            } else {
                await addProperty(propertyData)
                toast.success('Property added successfully')
            }
            setIsAddPropertyOpen(false)
            setIsEditPropertyOpen(false)
            setEditingProperty(null)
        } catch (error) {
            console.error('Failed to add/edit property:', error)
            if (error instanceof Error) {
                toast.error(`Failed to add/edit property: ${error.message}`)
            } else {
                toast.error('Failed to add/edit property: Unknown error')
            }
        }
    }

    const handleEdit = (property: Property) => {
        setEditingProperty(property)
        setIsEditPropertyOpen(true)
    }

    const handleDelete = async (id: Id<'properties'>) => {
        try {
            await deleteProperty({ id })
            toast.success('Property deleted successfully')
        } catch (error) {
            console.error('Failed to delete property:', error)
            toast.error('Failed to delete property')
        }
    }

    const handleSort = (field: keyof PropertyFormData) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const sortedProperties = [...properties].sort((a, b) => {
        if (!sortField) return 0
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    const uploadImage = async (file: File): Promise<string> => {
        try {
            // Replace this with your actual image upload logic
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return URL.createObjectURL(file)
        } catch (error) {
            console.error('Failed to upload image:', error)
            throw new Error('Failed to upload image')
        }
    }

    return (
        <div className="space-y-4 p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Properties</h1>
                <Dialog
                    open={isAddPropertyOpen}
                    onOpenChange={setIsAddPropertyOpen}
                >
                    <DialogTrigger asChild>
                        <Button>Add Property</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Property</DialogTitle>
                        </DialogHeader>
                        <PropertyForm onSubmit={onSubmit} />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Property Listings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-4">
                        <Input
                            className="max-w-sm"
                            placeholder="Search properties..."
                            type="search"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Status
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuRadioGroup value="all">
                                    <DropdownMenuRadioItem value="all">
                                        All
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="active">
                                        Active
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="pending">
                                        Pending
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="sold">
                                        Sold
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <PropertyTable
                        properties={sortedProperties}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                    />
                </CardContent>
            </Card>
            <Dialog
                open={isEditPropertyOpen}
                onOpenChange={setIsEditPropertyOpen}
            >
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Property</DialogTitle>
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

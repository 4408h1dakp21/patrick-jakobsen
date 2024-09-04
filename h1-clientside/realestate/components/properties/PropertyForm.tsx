import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Upload, X } from 'lucide-react'
import { FormField } from './FormField'
import { propertySchema, PropertyFormData, Property } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export const PropertyForm: React.FC<{
    onSubmit: (
        data: PropertyFormData,
        newStorageIds: string[],
        existingStorageIds: string[]
    ) => Promise<void>
    initialData?: Property
}> = ({ onSubmit, initialData }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [existingImages, setExistingImages] = useState<string[]>([])
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)

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
            isNew: false,
            isTrending: false,
        },
    })

    useEffect(() => {
        if (initialData && initialData.imageUrls) {
            setExistingImages(initialData.imageUrls)
        }
    }, [initialData])

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedFiles((prev) => [...prev, ...acceptedFiles])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleFormSubmit = async (data: PropertyFormData) => {
        const newStorageIds = await Promise.all(
            uploadedFiles.map(async (file) => {
                const postUrl = await generateUploadUrl()
                const result = await fetch(postUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': file.type },
                    body: file,
                })
                const { storageId } = await result.json()
                return storageId
            })
        )
        onSubmit(data, newStorageIds, existingImages)
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
                        as="input"
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
                    <div className="space-y-2">
                        <Label>Property Tags</Label>
                        <div className="flex space-x-4">
                            <Controller
                                name="isNew"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isNew"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <label
                                            htmlFor="isNew"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            New
                                        </label>
                                    </div>
                                )}
                            />
                            <Controller
                                name="isTrending"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isTrending"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <label
                                            htmlFor="isTrending"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Trending
                                        </label>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
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
                    {existingImages.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium">
                                Existing Images:
                            </h4>
                            <ul className="mt-2 space-y-2">
                                {existingImages.map((imageUrl, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`Property image ${index + 1}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeExistingImage(index)
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                                New files to upload:
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

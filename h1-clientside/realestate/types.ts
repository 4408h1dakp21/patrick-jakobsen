import { z } from 'zod'
import { Id } from '@/convex/_generated/dataModel'

export const propertySchema = z.object({
    address: z.string().min(1, 'Address is required'),
    price: z.number().positive('Price must be positive'),
    type: z.string().min(1, 'Property type is required'),
    status: z.string().min(1, 'Status is required'),
    bedrooms: z.number().int().positive('Number of bedrooms must be positive'),
    bathrooms: z.number().positive('Number of bathrooms must be positive'),
    squareFootage: z.number().int().positive('Square footage must be positive'),
    description: z.string().min(1, 'Description is required'),
    imageUrls: z.array(z.string()).default([]),
    isNew: z.boolean().default(false),
    isTrending: z.boolean().default(false),
})

export type PropertyFormData = z.infer<typeof propertySchema>

export interface Property extends PropertyFormData {
    _id: Id<'properties'>
}

export type Contract = {
    _id: Id<'contracts'>
    _creationTime: number
    status: string
    date: string
    contractId: string
    property: string
    client: string
}

// Define a separate type for the contract with propertyId
export type ContractWithPropertyId = Contract & { propertyId: Id<'properties'> }

import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getProperty = query({
    handler: async (ctx) => {
        return await ctx.db.query('properties').collect()
    },
})

export const addProperty = mutation({
    args: {
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
        isNew: v.boolean(),
        isTrending: v.boolean(),
    },
    handler: async (ctx, args) => {
        const propertyId = await ctx.db.insert('properties', {
            address: args.address,
            bathrooms: args.bathrooms,
            bedrooms: args.bedrooms,
            description: args.description,
            imageUrls: args.imageUrls,
            price: args.price,
            squareFootage: args.squareFootage,
            status: args.status,
            type: args.type,
            isNew: args.isNew,
            isTrending: args.isTrending,
        })
        return propertyId
    },
})

export const editProperty = mutation({
    args: {
        id: v.id('properties'),
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
        isNew: v.boolean(),
        isTrending: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args

        const existingProperty = await ctx.db.get(id)
        if (!existingProperty) {
            throw new Error(`Property with ID ${id} does not exist`)
        }

        await ctx.db.patch(id, updates)
    },
})

export const deleteProperty = mutation({
    args: { id: v.id('properties') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const getPropertyById = query({
    args: { id: v.id('properties') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
})

export const updatePropertyStatus = mutation({
    args: {
        id: v.id('properties'),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status })
    },
})

export const getProperties = query({
    handler: async (ctx) => {
        const properties = await ctx.db.query('properties').collect()
        return properties
    },
})

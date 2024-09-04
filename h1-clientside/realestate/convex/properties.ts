// File: convex/schema.ts
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    properties: defineTable({
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
    }),
})

// File: convex/properties.ts
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
    },
    handler: async (ctx, args) => {
        const propertyId = await ctx.db.insert('properties', args)
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
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args
        await ctx.db.patch(id, updates)
    },
})

export const deleteProperty = mutation({
    args: { id: v.id('properties') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

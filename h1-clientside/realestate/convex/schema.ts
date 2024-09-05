import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    clients: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        status: v.string(),
        journal: v.array(
            v.object({
                date: v.string(),
                entry: v.string(),
                category: v.string(),
            })
        ),
    }),
    contracts: defineTable({
        contractId: v.string(),
        property: v.string(),
        client: v.string(),
        status: v.string(),
        date: v.string(),
    }),
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
        isNew: v.boolean(),
        isTrending: v.boolean(),
    }),
})

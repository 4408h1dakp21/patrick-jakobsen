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
        isNew: v.boolean(),
        isTrending: v.boolean(),
    }),
})

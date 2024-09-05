// convex/contracts.ts
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getContracts = query({
    handler: async (ctx) => {
        return await ctx.db.query('contracts').collect()
    },
})

export const createContract = mutation({
    args: {
        propertyId: v.id('properties'),
        clientId: v.id('clients'),
        status: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        const property = await ctx.db.get(args.propertyId)
        const client = await ctx.db.get(args.clientId)
        if (!property || !client)
            throw new Error('Property or client not found')

        const contractId = `CON-${Math.floor(1000 + Math.random() * 9000)}`
        const contractIds = await ctx.db.insert('contracts', {
            contractId,
            property: property.address,
            client: client.name,
            status: args.status,
            date: args.date,
        })
        return contractIds
    },
})

export const deleteContract = mutation({
    args: { id: v.id('contracts') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const updatePropertyStatus = mutation({
    args: { id: v.id('properties'), status: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status })
    },
})

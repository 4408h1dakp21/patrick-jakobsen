// convex/clients.ts
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const addClient = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const clientId = await ctx.db.insert('clients', {
            ...args,
            journal: [],
        })
        return clientId
    },
})

export const getClients = query({
    handler: async (ctx) => {
        return await ctx.db.query('clients').collect()
    },
})

export const updateClient = mutation({
    args: {
        id: v.id('clients'),
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...updateData } = args
        await ctx.db.patch(id, updateData)
    },
})

export const deleteClient = mutation({
    args: { id: v.id('clients') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const addJournalEntry = mutation({
    args: {
        clientId: v.id('clients'),
        entry: v.string(),
        category: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        const client = await ctx.db.get(args.clientId)
        if (!client) throw new Error('Client not found')

        const newEntry = {
            date: args.date,
            entry: args.entry,
            category: args.category,
        }

        await ctx.db.patch(args.clientId, {
            journal: [...(client.journal || []), newEntry],
        })
    },
})

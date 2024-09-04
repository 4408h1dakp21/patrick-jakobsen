import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
})

export const getUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        if (!args.storageId) return null
        return await ctx.storage.getUrl(args.storageId)
    },
})

export const getUrls = query({
    args: { storageIds: v.array(v.string()) },
    handler: async (ctx, args) => {
        const urls = await Promise.all(
            args.storageIds.map(async (storageId) => {
                return await ctx.storage.getUrl(storageId)
            })
        )
        return urls
    },
})

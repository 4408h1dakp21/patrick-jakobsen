import { query } from './_generated/server'

export const getStats = query({
    handler: async (ctx) => {
        const properties = await ctx.db.query('properties').collect()
        const clients = await ctx.db.query('clients').collect()
        const contracts = await ctx.db.query('contracts').collect()

        const now = new Date()
        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const totalProperties = properties.length
        const activeListings = properties.filter(
            (p) => p.status === 'Active'
        ).length
        const newClients = clients.filter(
            (c) => new Date(c._creationTime) > lastMonth
        ).length
        const contractsSigned = contracts.filter(
            (c) => new Date(c.date) > lastMonth
        ).length

        // For demonstration purposes, we're using random changes
        // In a real application, you'd calculate these based on historical data
        const getRandomChange = () => Math.floor(Math.random() * 20) - 10

        return {
            totalProperties,
            totalPropertiesChange: getRandomChange(),
            activeListings,
            activeListingsChange: getRandomChange(),
            newClients,
            newClientsChange: getRandomChange(),
            contractsSigned,
            contractsSignedChange: getRandomChange(),
        }
    },
})

export const getRecentProperties = query({
    handler: async (ctx) => {
        const properties = await ctx.db
            .query('properties')
            .order('desc')
            .take(5)

        return properties
    },
})

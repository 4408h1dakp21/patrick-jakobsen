'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Bed,
    Bath,
    Square,
    Search,
    ThumbsUp,
    Home,
    ChevronRight,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    MapPin,
} from 'lucide-react'
import { Property } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LandingPage() {
    const properties = useQuery(api.properties.getProperty) || []
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProperties = useMemo(() => {
        if (!searchTerm.trim()) return []
        return properties.filter(
            (property) =>
                property.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                property.type
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                property.status
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                property.price.toString().includes(searchTerm)
        )
    }, [properties, searchTerm])

    const newProperties = properties.filter((p) => p.isNew)
    const trendingProperties = properties.filter((p) => p.isTrending)

    const PropertyCard = ({ property }: { property: Property }) => {
        const imageUrl = useQuery(api.files.getUrl, {
            storageId: property.imageUrls[0],
        })

        return (
            <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                <Link href={`/property/${property._id}`} passHref>
                    <Card className="w-full overflow-hidden h-full cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border-0 rounded-lg">
                        <div className="relative">
                            <Image
                                src={
                                    imageUrl ||
                                    '/placeholder.svg?height=250&width=400'
                                }
                                alt={property.address}
                                width={400}
                                height={250}
                                className="w-full h-[250px] object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                {property.isNew && (
                                    <Badge
                                        variant="default"
                                        className="bg-green-500 text-white"
                                    >
                                        Ny
                                    </Badge>
                                )}
                                {property.isTrending && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-blue-500 text-white"
                                    >
                                        Populær
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate">
                                {property.address}
                            </h3>
                            <p className="text-3xl font-bold text-primary mb-4">
                                {property.price.toLocaleString()} kr.
                            </p>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                                <span className="flex items-center">
                                    <Bed className="w-4 h-4 mr-1 text-primary" />{' '}
                                    {property.bedrooms}
                                </span>
                                <span className="flex items-center">
                                    <Bath className="w-4 h-4 mr-1 text-primary" />{' '}
                                    {property.bathrooms}
                                </span>
                                <span className="flex items-center">
                                    <Square className="w-4 h-4 mr-1 text-primary" />{' '}
                                    {property.squareFootage} m²
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <Badge
                                    variant={
                                        property.status === 'Aktiv'
                                            ? 'success'
                                            : 'warning'
                                    }
                                    className={`${
                                        property.status === 'Aktiv'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    } text-xs font-semibold px-2.5 py-0.5 rounded`}
                                >
                                    {property.status}
                                </Badge>
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </motion.div>
        )
    }

    const PropertyGrid = ({
        title,
        properties,
    }: {
        title: string
        properties: Property[]
    }) => (
        <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                {title}
            </h2>
            <AnimatePresence>
                {properties.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {properties.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-gray-500 dark:text-gray-400"
                    >
                        Ingen ejendomme fundet, der matcher dine søgekriterier.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Find Dit Drømmehjem
                        </h1>
                        <p className="mt-6 text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
                            Opdag den perfekte ejendom på din ideelle
                            beliggenhed med vores omfattende udvalg og
                            ekspertvejledning.
                        </p>
                    </motion.div>
                    <motion.form
                        onSubmit={handleSearch}
                        className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="min-w-0 flex-1">
                            <Input
                                placeholder="Søg efter beliggenhed, type, status eller pris"
                                className="block w-full rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </motion.form>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {searchTerm.trim() && (
                    <PropertyGrid
                        title="Søgeresultater"
                        properties={filteredProperties}
                    />
                )}

                {!searchTerm.trim() && (
                    <>
                        <PropertyGrid
                            title="Nye Ejendomme"
                            properties={newProperties}
                        />
                        <PropertyGrid
                            title="Populære Ejendomme"
                            properties={trendingProperties}
                        />
                    </>
                )}

                <section className="my-24">
                    <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                        Hvorfor Vælge Os?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Search,
                                title: 'Omfattende Udvalg',
                                description:
                                    'Gennemse vores store samling af ejendomme for at finde dit perfekte match. Vi tilbyder et bredt udvalg af muligheder, der passer til ethvert behov og budget.',
                            },
                            {
                                icon: ThumbsUp,
                                title: 'Ekspert Vejledning',
                                description:
                                    'Vores erfarne agenter er her for at hjælpe dig gennem hele processen og giver personlig rådgivning og støtte gennem hele din ejendomsrejse.',
                            },
                            {
                                icon: Home,
                                title: 'Problemfri Oplevelse',
                                description:
                                    'Nyd en gnidningsfri og problemfri proces for køb eller salg af ejendom med vores strømlinede tjenester og avancerede teknologi.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0">
                                    <CardContent className="p-8 text-center">
                                        <item.icon className="w-16 h-16 mx-auto text-primary mb-6" />
                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8 xl:col-span-1">
                            <div className="flex items-center space-x-4">
                                <Image
                                    src="/logo.svg"
                                    alt="Alice & Bob Huse"
                                    width={40}
                                    height={40}
                                />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Alice & Bob Huse
                                </h1>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-base max-w-md">
                                Vi hjælper dig med at finde dit drømmehjem.
                                Vores ekspertise og dedikation sikrer en
                                problemfri oplevelse fra start til slut.
                            </p>
                            <div className="flex space-x-6">
                                {[
                                    { icon: Facebook, name: 'Facebook' },
                                    { icon: Instagram, name: 'Instagram' },
                                    { icon: Twitter, name: 'Twitter' },
                                    { icon: Linkedin, name: 'LinkedIn' },
                                ].map((item) => (
                                    <a
                                        key={item.name}
                                        href="#"
                                        className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
                                    >
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                        <item.icon className="h-6 w-6" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        Løsninger
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {[
                                            'Køb bolig',
                                            'Sælg bolig',
                                            'Lej bolig',
                                            'Boligfinansiering',
                                        ].map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        Support
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {[
                                            'Prissætning',
                                            'Dokumentation',
                                            'Guides',
                                            'API Status',
                                        ].map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        Firma
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {['Om os', 'Blog', 'Job', 'Presse'].map(
                                            (item) => (
                                                <li key={item}>
                                                    <a
                                                        href="#"
                                                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                                                    >
                                                        {item}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        Juridisk
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {['Privatlivspolitik', 'Vilkår'].map(
                                            (item) => (
                                                <li key={item}>
                                                    <a
                                                        href="#"
                                                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                                                    >
                                                        {item}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                        <p className="text-base text-gray-400 xl:text-center">
                            &copy; 2024 Alice & Bob Huse. Alle rettigheder
                            forbeholdes.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

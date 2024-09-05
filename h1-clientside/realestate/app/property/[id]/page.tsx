'use client'

import React, { useMemo, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import {
    MapPin,
    Bed,
    Bath,
    Square,
    Home,
    ArrowLeft,
    Heart,
    Share2,
    Camera,
    Star,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { Property } from '@/types'
import { Id } from '@/convex/_generated/dataModel'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'
import { ContactForm } from '@/components/clients/ContactForm'
import { motion } from 'framer-motion'

// Dynamisk import af kortkomponenten
const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function Component({ params }: { params: { id: string } }) {
    const property = useQuery(api.properties.getPropertyById, {
        id: params.id as Id<'properties'>,
    })

    const storageIds = useMemo(() => {
        return property?.imageUrls || []
    }, [property])

    const imageUrls = useQuery(api.files.getUrls, { storageIds })
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    // Vis skelet-loading, hvis data stadig indlæses
    if (property === undefined || imageUrls === undefined) {
        return <PropertySkeleton />
    }

    // Vis fejlmeddelelse, hvis ejendommen ikke findes
    if (property === null) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Ejendom ikke fundet</h1>
                <Link href="/">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til
                        Ejendomme
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex justify-between items-center"
            >
                <Link href="/">
                    <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til
                        Ejendomme
                    </Button>
                </Link>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => {
                            toast({
                                title: 'Ejendom gemt!',
                                description:
                                    'Ejendommen er blevet gemt i dine favoritter.',
                            })
                        }}
                    >
                        <Heart className="mr-2 h-4 w-4" /> Gem
                    </Button>
                    <Button
                        variant="outline"
                        className="hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            toast({
                                title: 'Link kopieret!',
                                description:
                                    'Ejendommens link er blevet kopieret til din udklipsholder.',
                            })
                        }}
                    >
                        <Share2 className="mr-2 h-4 w-4" /> Del
                    </Button>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {imageUrls.map((url, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative">
                                            <img
                                                src={url!}
                                                alt={`Ejendomsbillede ${index + 1}`}
                                                className="w-full h-[510px] object-cover"
                                            />
                                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full flex items-center">
                                                <Camera className="w-4 h-4 mr-1" />
                                                <span>
                                                    {index + 1}/
                                                    {imageUrls.length}
                                                </span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-primary">
                            {property.address}
                        </h1>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>{property.address}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-4xl font-bold text-primary">
                            {property.price.toLocaleString()} kr.
                        </span>
                        <Badge
                            variant={
                                property.status === 'Aktiv'
                                    ? 'default'
                                    : 'secondary'
                            }
                            className="text-lg px-4 py-2"
                        >
                            {property.status}
                        </Badge>
                    </div>

                    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                                Ejendomsdetaljer
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-2 gap-6">
                                <li className="flex items-center text-lg">
                                    <Home className="w-6 h-6 mr-3 text-primary" />
                                    {property.type}
                                </li>
                                <li className="flex items-center text-lg">
                                    <Bed className="w-6 h-6 mr-3 text-primary" />
                                    {property.bedrooms} Soveværelser
                                </li>
                                <li className="flex items-center text-lg">
                                    <Bath className="w-6 h-6 mr-3 text-primary" />
                                    {property.bathrooms} Badeværelser
                                </li>
                                <li className="flex items-center text-lg">
                                    <Square className="w-6 h-6 mr-3 text-primary" />
                                    {property.squareFootage} m²
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Beskrivelse
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {property.description}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                        <div className="h-[500px] rounded-lg overflow-hidden">
                            <Map address={property.address} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center mt-8"
            >
                <ContactForm />
            </motion.div>
        </div>
    )
}

function PropertySkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Skeleton className="h-10 w-40" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-60 w-full rounded-lg" />
                </div>
            </div>
            <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
            <div className="text-center">
                <Skeleton className="h-12 w-40 mx-auto rounded-full" />
            </div>
        </div>
    )
}

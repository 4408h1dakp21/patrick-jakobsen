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
    DollarSign,
    Calendar,
    ArrowLeft,
    Heart,
    Share2,
    Camera,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { Property } from '@/types'
import { Id } from '@/convex/_generated/dataModel'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import toast from 'react-hot-toast'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function PropertyPage({ params }: { params: { id: string } }) {
    const property = useQuery(api.properties.getPropertyById, {
        id: params.id as Id<'properties'>,
    })

    const storageIds = useMemo(() => {
        return property?.imageUrls || []
    }, [property])

    const imageUrls = useQuery(api.files.getUrls, { storageIds })
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    if (property === undefined || imageUrls === undefined) {
        return <PropertySkeleton />
    }

    if (property === null) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Property not found</h1>
                <Link href="/properties">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                        Properties
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-6 flex justify-between items-center">
                <Link href="/">
                    <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                        Properties
                    </Button>
                </Link>
                <div>
                    <Button
                        variant="outline"
                        className="hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            toast.success('Link copied to clipboard')
                        }}
                    >
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4 ">
                    <Card className="overflow-hidden shadow-lg">
                        <Carousel className="w-full ">
                            <CarouselContent>
                                {imageUrls.map((url, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative ">
                                            <img
                                                src={url!}
                                                alt={`Property image ${index + 1}`}
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
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                            {property.address}
                        </h1>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="h-5 w-5" />
                            <span>{property.address}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-4xl font-bold text-primary">
                            ${property.price.toLocaleString()}
                        </span>
                        <Badge
                            variant={
                                property.status === 'Active'
                                    ? 'default'
                                    : 'secondary'
                            }
                            className="text-lg px-4 py-2"
                        >
                            {property.status}
                        </Badge>
                    </div>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Property Details
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
                                    {property.bedrooms} Bedrooms
                                </li>
                                <li className="flex items-center text-lg">
                                    <Bath className="w-6 h-6 mr-3 text-primary" />
                                    {property.bathrooms} Bathrooms
                                </li>
                                <li className="flex items-center text-lg">
                                    <Square className="w-6 h-6 mr-3 text-primary" />
                                    {property.squareFootage} sqft
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                {property.description}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow ">
                <CardContent className="p-0">
                    <div className="h-[500px]  rounded-lg overflow-hidden">
                        <Map address={property.address} />
                    </div>
                </CardContent>
            </Card>

            <div className="text-center mt-8">
                <Button
                    size="lg"
                    className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white"
                >
                    Contact Agent
                </Button>
            </div>
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

'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
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
    Search,
    DollarSign,
    ThumbsUp,
} from 'lucide-react'
import { Property } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

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
            <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                    <div className="relative">
                        <img
                            src={
                                imageUrl ||
                                '/placeholder.svg?height=200&width=300'
                            }
                            alt={property.address}
                            className="w-full h-[200px] object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
                            {property.isNew && (
                                <Badge variant="default">New</Badge>
                            )}
                            {property.isTrending && (
                                <Badge variant="secondary">Trending</Badge>
                            )}
                            <Badge
                                variant={
                                    property.status === 'Active'
                                        ? 'success'
                                        : 'warning'
                                }
                            >
                                {property.status}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 truncate">
                        {property.address}
                    </CardTitle>
                    <p className="text-2xl font-bold text-primary mb-2">
                        ${property.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" /> {property.bedrooms}
                        </span>
                        <span className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />{' '}
                            {property.bathrooms}
                        </span>
                        <span className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />{' '}
                            {property.squareFootage} sqft
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                        {property.description}
                    </p>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/property/${property._id}`}
                        passHref
                        className="w-full"
                    >
                        <Button variant="outline" className="w-full">
                            View Details
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        )
    }

    const PropertyCarousel = ({
        title,
        properties,
    }: {
        title: string
        properties: Property[]
    }) => (
        <div className="my-12">
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            {properties.length > 0 ? (
                <Carousel className="w-full max-w-7xl mx-auto">
                    <CarouselContent>
                        {properties.map((property) => (
                            <CarouselItem
                                key={property._id}
                                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <PropertyCard property={property} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <p className="text-center text-gray-500">
                    No properties found matching your search criteria.
                </p>
            )}
        </div>
    )

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // The search is already handled by the filteredProperties useMemo
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">
                    Find Your Dream Home
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Discover the perfect property in your ideal location with
                    our extensive listings and expert guidance.
                </p>
                <form
                    onSubmit={handleSearch}
                    className="flex justify-center items-center space-x-4 mb-8"
                >
                    <Input
                        placeholder="Search by location, type, status, or price"
                        className="max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </form>
                <Link href="/properties" passHref>
                    <Button size="lg" variant="outline">
                        Browse All Properties
                    </Button>
                </Link>
            </header>

            {searchTerm.trim() && (
                <>
                    <PropertyCarousel
                        title="Search Results"
                        properties={filteredProperties}
                    />
                    {filteredProperties.length === 0 && (
                        <p className="text-center text-gray-500 my-8">
                            No properties found matching your search criteria.
                        </p>
                    )}
                </>
            )}

            {!searchTerm.trim() && (
                <>
                    <PropertyCarousel
                        title="New Listings"
                        properties={newProperties}
                    />
                    <PropertyCarousel
                        title="Trending Properties"
                        properties={trendingProperties}
                    />
                </>
            )}

            <section className="my-16">
                <h2 className="text-4xl font-bold mb-8 text-center">
                    Why Choose Us?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <Search className="w-12 h-12 mx-auto text-primary mb-4" />
                            <CardTitle>Extensive Listings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Browse through our vast collection of properties
                                to find your perfect match. We offer a wide
                                range of options to suit every need and budget.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <ThumbsUp className="w-12 h-12 mx-auto text-primary mb-4" />
                            <CardTitle>Expert Guidance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Our experienced agents are here to assist you
                                every step of the way, providing personalized
                                advice and support throughout your property
                                journey.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <DollarSign className="w-12 h-12 mx-auto text-primary mb-4" />
                            <CardTitle>Seamless Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Enjoy a smooth and hassle-free property buying
                                or selling process with our streamlined services
                                and cutting-edge technology.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}

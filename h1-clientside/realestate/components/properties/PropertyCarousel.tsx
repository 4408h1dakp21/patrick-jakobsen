import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Property } from '@/types'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Skeleton } from '@/components/ui/skeleton'

export const PropertyCarousel: React.FC<{ properties: Property[] }> = ({
    properties,
}) => {
    // Tilstandsvariabel for det aktuelle billede i karrusellen
    const [currentIndex, setCurrentIndex] = useState(0)

    // Funktion til at gå til næste billede
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === properties.length - 1 ? 0 : prevIndex + 1
        )
    }

    // Funktion til at gå til forrige billede
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? properties.length - 1 : prevIndex - 1
        )
    }

    // Memoiseret værdi af den aktuelle ejendom
    const currentProperty = useMemo(() => {
        return properties[currentIndex] || null
    }, [properties, currentIndex])

    // Memoiseret værdi af det aktuelle billedes storage ID
    const storageId = useMemo(() => {
        return currentProperty?.imageUrls[0] || ''
    }, [currentProperty])

    // Hent billedets URL fra Convex
    const imageUrlResult = useQuery(api.files.getUrl, { storageId })

    // Hvis der ikke er nogen ejendomme, vis en besked
    if (properties.length === 0) {
        return <div>Ingen ejendomme tilgængelige</div>
    }

    const isLoading = imageUrlResult === undefined
    const imageUrl = imageUrlResult ?? '/placeholder.jpg'

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
            <div className="w-full h-full">
                {isLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={imageUrl}
                        alt={currentProperty?.address || ''}
                        layout="fill"
                        objectFit="cover"
                    />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                    <h3 className="text-xl font-bold">
                        {currentProperty?.address}
                    </h3>
                    <p>
                        {currentProperty?.type} -{' '}
                        {currentProperty?.price.toLocaleString()} kr.
                    </p>
                </div>
            </div>
            <Button
                className="absolute top-1/2 left-2 transform -translate-y-1/2"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    )
}

'use client'

import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapProps {
    address: string
}

const Map: React.FC<MapProps> = ({ address }) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            version: 'weekly',
        })

        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode(
                { address: address },
                (
                    results: google.maps.GeocoderResult[] | null,
                    status: google.maps.GeocoderStatus
                ) => {
                    if (
                        status === google.maps.GeocoderStatus.OK &&
                        results &&
                        results[0] &&
                        mapRef.current
                    ) {
                        const map = new google.maps.Map(mapRef.current, {
                            center: results[0].geometry.location,
                            zoom: 15,
                        })
                        new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                        })
                    }
                }
            )
        })
    }, [address])

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}

export default Map

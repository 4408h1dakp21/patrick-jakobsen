import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
    const values = [
        {
            title: 'Integrity',
            description:
                'We conduct our business with the highest ethical standards, ensuring transparency and honesty in all our dealings.',
            icon: CheckCircle,
        },
        {
            title: 'Excellence',
            description:
                "We strive for excellence in every aspect of our service, continuously improving to exceed our clients' expectations.",
            icon: CheckCircle,
        },
        {
            title: 'Client-Centric',
            description:
                "Our clients' needs and satisfaction are at the heart of everything we do. We're committed to building long-lasting relationships based on trust and results.",
            icon: CheckCircle,
        },
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
                About Pertas Real Estate
            </h1>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Pertas Real Estate has been a trusted name in the
                        property market for over two decades. Our commitment to
                        excellence and customer satisfaction has made us a
                        leader in the industry.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        We specialize in residential and commercial properties,
                        offering a wide range of services including buying,
                        selling, renting, and property management. Our team of
                        experienced professionals is dedicated to helping you
                        find the perfect property or maximize the value of your
                        real estate investments.
                    </p>
                    <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
                        alt="Pertas Real Estate Office"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <Card
                            key={index}
                            className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-6">
                                <value.icon className="w-12 h-12 text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

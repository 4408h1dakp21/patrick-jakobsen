'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'react-hot-toast'

export function ContactForm() {
    // Tilstandsvariabler for formular og dialog
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    // Mutation for at tilføje en ny klient
    const addClient = useMutation(api.clients.addClient)

    // Håndter formularindsendelse
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await addClient({ name, email, phone, message, status: 'Aktiv' })
            toast.success('Kontaktanmodning sendt med succes!')
            setIsOpen(false)
            // Nulstil formularfelter
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
        } catch (error) {
            toast.error('Kunne ikke sende kontaktanmodning')
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white"
                >
                    Kontakt Mægler
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Kontakt Mægler</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Navn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="tel"
                        placeholder="Telefon"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Besked"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">
                        Send
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

'use client'

import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from '@/components/ui/table'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { Id } from '@/convex/_generated/dataModel'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Search } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Kategorienavne for journalindlæg
const journalCategories = [
    'Generel', // General
    'Møde', // Meeting
    'Telefonsamtale', // Phone Call
    'Email', // Email
    'Opgave', // Task
    'Opfølgning', // Follow-up
]

export default function ClientsPage() {
    // Hent klientdata fra API'et eller brug en tom liste
    const clients = useQuery(api.clients.getClients) || []
    const [searchTerm, setSearchTerm] = useState('') // Søgeterm for at filtrere klienter
    const deleteClient = useMutation(api.clients.deleteClient) // Sletning af klient
    const updateClient = useMutation(api.clients.updateClient) // Opdatering af klient
    const addJournalEntry = useMutation(api.clients.addJournalEntry) // Tilføj journalindlæg

    // State til håndtering af redigering og journalindlæg
    const [editingClient, setEditingClient] = useState<any>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)
    const [journalEntry, setJournalEntry] = useState('')
    const [journalCategory, setJournalCategory] = useState('Generel')
    const [journalDate, setJournalDate] = useState<Date | undefined>(new Date())
    const [journalSearchTerm, setJournalSearchTerm] = useState('')

    // Filtrerede klienter baseret på søgefeltet
    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone.includes(searchTerm)
    )

    // Filtrerede journalindlæg baseret på søgning i journalen
    const filteredJournalEntries = useMemo(() => {
        if (!editingClient?.journal) return []
        return editingClient.journal
            .filter(
                (entry: any) =>
                    entry.entry
                        .toLowerCase()
                        .includes(journalSearchTerm.toLowerCase()) ||
                    entry.category
                        .toLowerCase()
                        .includes(journalSearchTerm.toLowerCase())
            )
            .sort(
                (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )
    }, [editingClient, journalSearchTerm])

    // Håndtering af sletning af klient
    const handleDelete = async (id: Id<'clients'>) => {
        try {
            await deleteClient({ id })
            toast.success('Klient slettet med succes')
        } catch (error) {
            toast.error('Kunne ikke slette klient')
        }
    }

    // Håndtering af redigering af klient
    const handleEdit = (client: any) => {
        setEditingClient(client)
        setIsEditDialogOpen(true)
    }

    // Håndtering af opdatering af klient
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateClient({
                id: editingClient._id,
                name: editingClient.name,
                email: editingClient.email,
                phone: editingClient.phone,
                status: editingClient.status,
            })
            setIsEditDialogOpen(false)
            toast.success('Klient opdateret med succes')
        } catch (error) {
            toast.error('Kunne ikke opdatere klient')
        }
    }

    // Håndtering af tilføjelse af journalindlæg
    const handleJournalEntry = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await addJournalEntry({
                clientId: editingClient._id,
                entry: journalEntry,
                category: journalCategory,
                date: journalDate?.toISOString() || new Date().toISOString(),
            })
            setJournalEntry('')
            setJournalCategory('Generel')
            setJournalDate(new Date())
            toast.success('Journalindlæg tilføjet med succes')
        } catch (error) {
            toast.error('Kunne ikke tilføje journalindlæg')
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Klienter</h1> {/* Titel */}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Klientliste</CardTitle> {/* Klientliste */}
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-4">
                        <Input
                            className="max-w-sm"
                            placeholder="Søg klienter..."
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Navn</TableHead> {/* Name */}
                                <TableHead>Email</TableHead>
                                <TableHead>Telefon</TableHead> {/* Phone */}
                                <TableHead>Status</TableHead>
                                <TableHead>Handlinger</TableHead>{' '}
                                {/* Actions */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredClients.map((client) => (
                                <TableRow key={client._id}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell>{client.phone}</TableCell>
                                    <TableCell>{client.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleEdit(client)}
                                        >
                                            Rediger {/* Edit */}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setEditingClient(client)
                                                setIsJournalDialogOpen(true)
                                            }}
                                        >
                                            Journal
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                handleDelete(client._id)
                                            }
                                        >
                                            Slet {/* Delete */}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog for redigering af klient */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rediger Klient</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <Input
                            placeholder="Navn" // Name
                            value={editingClient?.name || ''}
                            onChange={(e) =>
                                setEditingClient({
                                    ...editingClient,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Email"
                            value={editingClient?.email || ''}
                            onChange={(e) =>
                                setEditingClient({
                                    ...editingClient,
                                    email: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Telefon" // Phone
                            value={editingClient?.phone || ''}
                            onChange={(e) =>
                                setEditingClient({
                                    ...editingClient,
                                    phone: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Status"
                            value={editingClient?.status || ''}
                            onChange={(e) =>
                                setEditingClient({
                                    ...editingClient,
                                    status: e.target.value,
                                })
                            }
                        />
                        <Button type="submit">Opdater Klient</Button>{' '}
                        {/* Update Client */}
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog for journal */}
            <Dialog
                open={isJournalDialogOpen}
                onOpenChange={setIsJournalDialogOpen}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>
                            Klient Journal: {editingClient?.name}{' '}
                            {/* Client Journal */}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                placeholder="Søg journalindlæg..." // Search journal entries
                                value={journalSearchTerm}
                                onChange={(e) =>
                                    setJournalSearchTerm(e.target.value)
                                }
                                className="flex-grow"
                            />
                            <Search className="text-gray-400" />
                        </div>
                        <div className="max-h-96 overflow-y-auto space-y-4">
                            {filteredJournalEntries.map(
                                (entry: any, index: number) => (
                                    <Card key={index} className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-semibold text-gray-600">
                                                {format(
                                                    new Date(entry.date),
                                                    'PPpp'
                                                )}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                                {entry.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-800">
                                            {entry.entry}
                                        </p>
                                    </Card>
                                )
                            )}
                        </div>
                        <form
                            onSubmit={handleJournalEntry}
                            className="space-y-4"
                        >
                            <Textarea
                                placeholder="Tilføj et nyt journalindlæg..." // Add a new journal entry
                                value={journalEntry}
                                onChange={(e) =>
                                    setJournalEntry(e.target.value)
                                }
                                className="min-h-[100px]"
                            />
                            <div className="flex space-x-4">
                                <Select
                                    value={journalCategory}
                                    onValueChange={setJournalCategory}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Vælg kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {journalCategories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[280px] justify-start text-left font-normal',
                                                !journalDate &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {journalDate ? (
                                                format(journalDate, 'PPP')
                                            ) : (
                                                <span>Vælg en dato</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={journalDate}
                                            onSelect={setJournalDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Button type="submit">Tilføj Indlæg</Button>{' '}
                            {/* Add Entry */}
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

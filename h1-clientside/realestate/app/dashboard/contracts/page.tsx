'use client'

import React, { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { Download, Trash2 } from 'lucide-react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Id } from '@/convex/_generated/dataModel'
import { Contract, ContractWithPropertyId } from '@/types'

export default function ContractsPage() {
    // Hent kontrakter, ejendomme og klienter fra databasen
    const contracts = useQuery(api.contracts.getContracts) || []
    const properties = useQuery(api.properties.getProperties) || []
    const clients = useQuery(api.clients.getClients) || []

    // Tilstandsvariabler for søgning og dialoger
    const [searchTerm, setSearchTerm] = useState('')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] =
        useState<Id<'properties'> | null>(null)
    const [selectedClient, setSelectedClient] = useState<Id<'clients'> | null>(
        null
    )
    const [contractToDelete, setContractToDelete] =
        useState<ContractWithPropertyId | null>(null)

    // Mutations for at oprette og slette kontrakter samt opdatere ejendomsstatus
    const createContract = useMutation(api.contracts.createContract)
    const updatePropertyStatus = useMutation(
        api.properties.updatePropertyStatus
    )
    const deleteContract = useMutation(api.contracts.deleteContract)

    // Filtrer kontrakter baseret på søgeterm
    const filteredContracts = contracts.filter(
        (contract) =>
            contract.contractId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            contract.property
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            contract.client.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Håndter oprettelse af ny kontrakt
    const handleCreateContract = async () => {
        if (!selectedProperty || !selectedClient) {
            toast.error('Vælg venligst både en ejendom og en klient')
            return
        }

        try {
            const contractId = await createContract({
                propertyId: selectedProperty,
                clientId: selectedClient,
                status: 'Afventer',
                date: new Date().toISOString(),
            })

            await updatePropertyStatus({
                id: selectedProperty,
                status: 'Afventer',
            })

            setIsCreateDialogOpen(false)
            setSelectedProperty(null)
            setSelectedClient(null)
            toast.success('Kontrakt oprettet med succes')
        } catch (error) {
            toast.error('Kunne ikke oprette kontrakt')
        }
    }

    // Håndter sletning af kontrakt
    const handleDeleteContract = async (sold: boolean) => {
        if (!contractToDelete) return

        try {
            await deleteContract({ id: contractToDelete._id })
            await updatePropertyStatus({
                id: contractToDelete.propertyId,
                status: sold ? 'Solgt' : 'Aktiv',
            })

            setIsDeleteDialogOpen(false)
            setContractToDelete(null)
            toast.success('Kontrakt slettet med succes')
        } catch (error) {
            toast.error('Kunne ikke slette kontrakt')
        }
    }

    // Generer PDF for en given kontrakt
    const generatePDF = async (contract: Contract) => {
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

        const fontSize = 12
        const lineHeight = fontSize * 1.5

        // Tilføj titel
        page.drawText('Alice & Bob Huse', {
            x: 50,
            y: height - 50,
            size: 24,
            font: boldFont,
            color: rgb(0.1, 0.1, 0.1),
        })

        page.drawText('Kontraktaftale', {
            x: 50,
            y: height - 80,
            size: 20,
            font: boldFont,
            color: rgb(0.2, 0.2, 0.2),
        })

        // Definer indhold for PDF
        const content = [
            { label: 'Kontrakt ID:', value: contract.contractId },
            { label: 'Ejendom:', value: contract.property },
            { label: 'Klient:', value: contract.client },
            { label: 'Status:', value: contract.status },
            {
                label: 'Dato:',
                value: new Date(contract.date).toLocaleDateString('da-DK'),
            },
        ]

        // Tilføj indhold til PDF
        content.forEach((item, index) => {
            page.drawText(item.label, {
                x: 50,
                y: height - 120 - index * lineHeight,
                size: fontSize,
                font: boldFont,
                color: rgb(0.3, 0.3, 0.3),
            })
            page.drawText(item.value, {
                x: 200,
                y: height - 120 - index * lineHeight,
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            })
        })

        // Tilføj sidefod
        page.drawText('Alice & Bob Huse - Dit drømmehjem venter', {
            x: 50,
            y: 50,
            size: 10,
            font: font,
            color: rgb(0.5, 0.5, 0.5),
        })

        // Gem og download PDF
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `AliceBobHuse_Kontrakt_${contract.contractId}.pdf`
        link.click()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Kontrakter</h1>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>Opret Kontrakt</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Opret Ny Kontrakt</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Select
                                value={selectedProperty?.toString() || ''}
                                onValueChange={(value) =>
                                    setSelectedProperty(
                                        value as Id<'properties'>
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Vælg Ejendom" />
                                </SelectTrigger>
                                <SelectContent>
                                    {properties.map((property) => (
                                        <SelectItem
                                            key={property._id}
                                            value={property._id}
                                        >
                                            {property.address}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedClient?.toString() || ''}
                                onValueChange={(value) =>
                                    setSelectedClient(value as Id<'clients'>)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Vælg Klient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((client) => (
                                        <SelectItem
                                            key={client._id}
                                            value={client._id}
                                        >
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleCreateContract}>
                                Opret Kontrakt
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Kontraktliste</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-4">
                        <Input
                            className="max-w-sm"
                            placeholder="Søg kontrakter..."
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kontrakt ID</TableHead>
                                <TableHead>Ejendom</TableHead>
                                <TableHead>Klient</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dato</TableHead>
                                <TableHead>Handlinger</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContracts.map((contract) => (
                                <TableRow key={contract._id}>
                                    <TableCell>{contract.contractId}</TableCell>
                                    <TableCell>{contract.property}</TableCell>
                                    <TableCell>{contract.client}</TableCell>
                                    <TableCell>{contract.status}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            contract.date
                                        ).toLocaleDateString('da-DK')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    generatePDF(contract)
                                                }
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download PDF
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    const property =
                                                        properties.find(
                                                            (p) =>
                                                                p.address ===
                                                                contract.property
                                                        )
                                                    if (property) {
                                                        setContractToDelete({
                                                            ...contract,
                                                            propertyId:
                                                                property._id,
                                                        })
                                                        setIsDeleteDialogOpen(
                                                            true
                                                        )
                                                    } else {
                                                        toast.error(
                                                            'Kunne ikke finde tilknyttet ejendom'
                                                        )
                                                    }
                                                }}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Slet
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Slet Kontrakt</DialogTitle>
                    </DialogHeader>
                    <p>Er du sikker på, at du vil slette denne kontrakt?</p>
                    <p>Blev ejendommen solgt?</p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Annuller
                        </Button>
                        <Button onClick={() => handleDeleteContract(false)}>
                            Nej, Marker som Aktiv
                        </Button>
                        <Button onClick={() => handleDeleteContract(true)}>
                            Ja, Marker som Solgt
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

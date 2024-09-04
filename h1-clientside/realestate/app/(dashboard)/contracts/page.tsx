import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function ContractsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <Button>Create Contract</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contract List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <Input className="max-w-sm" placeholder="Search contracts..." type="search" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>CON-001</TableCell>
                <TableCell>123 Main St, Anytown, USA</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>2023-05-15</TableCell>
                <TableCell>
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CON-002</TableCell>
                <TableCell>456 Oak Ave, Somewhere, USA</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Signed</TableCell>
                <TableCell>2023-05-10</TableCell>
                <TableCell>
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CON-003</TableCell>
                <TableCell>789 Pine Rd, Elsewhere, USA</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>2023-05-05</TableCell>
                <TableCell>
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Enter company name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Company Address</Label>
            <Textarea id="company-address" placeholder="Enter company address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-phone">Company Phone</Label>
            <Input id="company-phone" placeholder="Enter company phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-email">Company Email</Label>
            <Input id="company-email" placeholder="Enter company email" type="email" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select id="language" className="w-full rounded-md border border-gray-300 p-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select id="timezone" className="w-full rounded-md border border-gray-300 p-2">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-6 (Central Time)</option>
              <option>UTC-7 (Mountain Time)</option>
              <option>UTC-8 (Pacific Time)</option>
            </select>
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}

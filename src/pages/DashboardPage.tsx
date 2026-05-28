import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

const users = [
  {
    id: 1,
    name: "Jacob",
    email: "jacob@gmail.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Mary",
    email: "mary@gmail.com",
    status: "Pending",
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    status: "Blocked",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              12,540
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              $84,200
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              1,245
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>

                  <TableCell>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Package, ShoppingCart } from 'lucide-react'
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useToast } from '@/hooks/use-toast'
import { useFetch } from '@/hooks/FetchContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'


export default function AdminDashboard() {


  const {products, allUser, setAllUsers, summary, setSummary, adminOrder, setAdminOrders} = useGlobalContext()
  const { toast } = useToast()
  const {get: fetchAllUsers, get: getSummary, get: getOrders } = useFetch()

  const total = products.reduce((sum, item) => sum + item.price , 0)

console.log(summary)

  useEffect(() =>  {

    let res = async ()  => {
      let data = await fetchAllUsers("users")
      let reqorders = await getOrders("orders")
      let resSummary = await getSummary("admin/summary")

      if(Array.isArray(reqorders)){
        setAdminOrders(reqorders)
      }
      if(resSummary?.total_orders){
        setSummary(resSummary)
      }

      if(data?.msg){
        toast({
          title: "Error",
          description: data['msg'],
          variant: "destructive",
        });
        return
      }
      setAllUsers(data)
    }
    res()

  }, [products])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white ">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total_products}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total_users}</div>
          </CardContent>
        </Card>
        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total_orders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {summary?.total_profits}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order-id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminOrder?.map(category => (
            <TableRow key={category.id}>
              <TableCell>INV-{category.id}</TableCell>
              <TableCell>{category.username}</TableCell>
              <TableCell>{category.total_amount}</TableCell>
              <TableCell>
                <Badge variant={"secondary"}>
                  {category.status}
                </Badge>
                </TableCell>
              <TableCell>{category.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
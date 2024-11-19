import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  CheckCircle } from 'lucide-react'
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useFetch, baseURL } from '@/hooks/FetchContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import InvoiceModal from '@/components/InvoiceModal'

const formSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(10, "Must be atleast 10 Numbers"),
  zipCode: z.string().min(5, "Valid zip code is required"),
})

export default function Checkout() {
  const { toast } = useToast()
  const { cart, seCart, product,
    clientTransaction, setclientTransactions,
        clietOrder, setClietOrders, clietProduct, setClietProducts} = useGlobalContext()
  const [isModalOpen, setIsModalOpen] = useState(false)  
  const total = cart.reduce((sum, item) => sum + item.purchase_price , 0)
  const {post: postOrder, post: postTransaction, get: getTransaction, get: getmyOrders, get: getmyProducts} = useFetch()
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(null)


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "BoogieInc",
      email: "test@gmail.com",
      phone: "2547123456789",
      address: "123 main street",
      city: "Nairobi",
      zipCode: "200039",
    },
  })

  async function onSubmit(values) {
    setLoading(true)
    let reqGen = await generateOrder()

    
    
    if(reqGen){
      await addOrderItems(reqGen, cart)

      let transactionData = {...values, order_id: reqGen, amount: total, payment_status: 'Pending'}
      await postTransaction("transactions",transactionData)
    }
    setLoading(null)
    setIsModalOpen(true)  
    // seCart([])
  }
  const addOrderItems = async (orderId, cart) => {
    const token = localStorage.getItem('access_token');

    try {
      const promises = cart.map((item) =>
        fetch(`${baseURL}order_items`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), 
          },
          body: JSON.stringify({
            order_id: orderId,
            product_id: item.id,
            quantity: 1,
            price: item.purchase_price
          })
        }).then((res) => res.json())
      );
  
      const responses = await Promise.all(promises);
  
      toast({
        title: "Order placed successfully",
        description: "Thank you for your Order!",
      })

    } catch (error) {
          toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive",
        })
    }
  };
  

  async function generateOrder(){
    let newOder = {
        "total": total,
        "status": "Pending"
    }

    let req = await postOrder("orders",newOder)
    if(req?.['id']){
      setOrderId(req['id'])
      toast({
        title: "Order Genarated successfully",
        description: "TOrder Genarated successfully!",
        })
        return req['id']
      } else {
        toast({
          title: "Error",
          description: "Failed to place order",
          variant: "destructive",
        })
        return false
    }

  }

  useEffect(() => {
    const fetchItems = async () => {
      const resTrans = await getTransaction("transactions");
      const resOrder = await getmyOrders("orders");
      const resProduct = await getmyProducts("order_items");

      if(Array.isArray(resTrans)){
        setclientTransactions(resTrans)
      }
      if(Array.isArray(resOrder)){
        setClietOrders(resOrder)
        }
        if(Array.isArray(resProduct)){
          setClietProducts(resProduct)
          }
      };
      fetchItems();
      }, [loading]);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Order Summary</CardTitle>
            <CardDescription>Review your order before payment</CardDescription>
          </CardHeader>
          <CardContent>
            {
              cart.length > 0 ? (
                cart.map(value => (
                  <p key={value.id} className="font-light">{value.name}: KES {value.purchase_price.toFixed(2)}</p>
                ))
              ) : (
                <p className="text-orange-600">No items in cart</p>
              )
            }
          </CardContent>
          <CardFooter>
            <p className="font-bold text-green-600">Total: KES {total.toFixed(2)}</p>
          </CardFooter>
        </Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="2547123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full"   disabled={cart.length === 0} 
            >{loading ? 'Generating Order..' : 'Place Order'}</Button>
          </form>
        </Form>
      </div>
      

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger</Button> 
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
              Congratulations!
            </DialogTitle>
            <DialogDescription>
              Your order has been placed successfully and is worth KES {total.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
        </>
      </Dialog>
      <div className="mt-8 space-y-4">

      <h1 className="text-2xl font-bold mb-6">My Transaction</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>OrderId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pay Now</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientTransaction?.map(category => (
            <TableRow key={category.id}>
              <TableCell className="text-nowrap">INV-{category.id}</TableCell>
              <TableCell className="text-nowrap">Order-{category.order_id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.phone}</TableCell>
              <TableCell>{category.amount}</TableCell>
              <TableCell>
              <Badge variant={category.payment_status == 'Paid' ? '2' : 0} >
                  {category.payment_status}
                </Badge>

              </TableCell>
              <TableCell>
                <InvoiceModal setLoading={setLoading} {...category} />
                </TableCell>
              <TableCell>{category.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
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
          {clietOrder?.map(category => (
            <TableRow key={category.id}>
              <TableCell>INV-{category.id}</TableCell>
              <TableCell>{category.username}</TableCell>
              <TableCell>{category.total_amount}</TableCell>
              <TableCell>
              <Badge variant={category.status == 'Shipped' ? '2' : 0}>
                  {category.status}
                </Badge>

              </TableCell>
              <TableCell>{category.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h1 className="text-2xl font-bold mb-6">My Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrderId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clietProduct?.map(category => (
            <TableRow key={category.id}>
              <TableCell className="text-nowrap">Order-{category.id}</TableCell>
              <TableCell className="text-nowrap">{category.product_name}</TableCell>
              <TableCell>{category.quantity}</TableCell>
              <TableCell>{category.supplier}</TableCell>
              <TableCell>{category.price}</TableCell>
              <TableCell>
              <Badge variant={category.status == 'Shipped' ? '2' : 0}>
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
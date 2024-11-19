import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from 'lucide-react'
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useToast } from '@/hooks/use-toast'


export default function Cart() {
  const navigate = useNavigate()
  const {cart, seCart} = useGlobalContext()
  const { toast } = useToast()

  const total = cart.reduce((sum, item) => sum + item.purchase_price , 0)


  const handleRemoveItem = (id, name) => {
    seCart(prev => prev.filter(cart => cart.id !== id));

    toast({
      title: "Category Deleted",
      description: `${name} has been Removed successfully.`,
      variant: "destructive",
    });

  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-white ">Your Cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product-Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover mb-4 rounded-md" />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>KES {item.purchase_price.toFixed(2)}</TableCell>
              <TableCell>{item.supplier_name}</TableCell>

              <TableCell>
                <Button variant="ghost" onClick={() => handleRemoveItem(item.id, item.name)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>                  
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-bold text-white underline">Total: KES {total.toFixed(2)}</div>
        <Button 
  onClick={() => navigate('/checkout')} 
  disabled={cart.length === 0}
>
  Proceed to Checkout
</Button>

      </div>

    </div>
  )
}
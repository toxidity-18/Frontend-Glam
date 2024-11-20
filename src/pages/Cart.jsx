import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from 'lucide-react'
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, setCart } = useGlobalContext()
  const { toast } = useToast()

  // Calculate the total price of items in the cart
  const total = cart.reduce((sum, item) => sum + item.purchase_price, 0)

  // Remove item from the cart and show a toast notification
  const handleRemoveItem = (id, name) => {
    setCart(prev => prev.filter(item => item.id !== id))
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Table */}
      {cart.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>KES {item.purchase_price.toFixed(2)}</TableCell>
                  <TableCell>{item.supplier_name}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Cart Summary */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: <span className="text-pink-700">KES {total.toFixed(2)}</span>
            </div>
            <Button 
              onClick={() => navigate('/checkout')} 
              disabled={cart.length === 0}
              className="bg-pink-700 hover:bg-pink-800 text-white"
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        // Empty Cart Message
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <Button 
            onClick={() => navigate('/products')} 
            className="mt-4 bg-pink-700 hover:bg-pink-800 text-white"
          >
            Browse Products
          </Button>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-800 text-pink-700 py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* About Section in Footer */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Beauty Shop</h3>
            <p className="text-pink-200">
              Discover the finest selection of beauty products tailored for all your skincare and makeup needs. Empowering your beauty, every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-pink-200">
              <li><Link to="#about-us" className="hover:underline">About Us</Link></li>
              <li><Link to="/products" className="hover:underline">Shop Products</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-pink-200"><strong>Email:</strong> support@beautyshop.com</p>
            <p className="text-pink-200"><strong>Phone:</strong> +1 (800) 123-4567</p>
            <div className="mt-4 text-pink-200 flex justify-center sm:justify-start space-x-4">
              {/* Social Media Icons */}
              <a href="#" aria-label="Facebook" className="text-2xl text-pink-200 hover:text-pink-200"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram" className="text-2xl text-pink-200 hover:text-pink-200"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter" className="text-2xl text-pink-200 hover:text-pink-200"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-200 text-sm">
          <p>&copy; 2024 Beauty Shop. All rights reserved.</p>
          <a href="#top" className="hover:underline">Back to Top</a>
        </div>
      </footer>
    </div>
  )
}

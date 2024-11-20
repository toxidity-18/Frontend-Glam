import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useFetch } from "@/hooks/FetchContext"
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '@/hooks/GlobalContext'

// Validation schema for form fields
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export default function Login() {
  const { post, loading } = useFetch()
  const { setUserData } = useGlobalContext()
  const goto = useNavigate()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const response = await post('login', values)

    if (response?.access_token) {
      // Storing user details in local storage
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('active_user', response.isAdmin)
      localStorage.setItem('data', JSON.stringify(response.data))
      setUserData(response.data)

      // Show success message and navigate to products page
      toast({
        title: "Logged in successfully",
        description: "Welcome back to BeautyShop!",
      })
      goto("/products")
    } else {
      // Handle login failure
      toast({
        title: "Wrong Credentials",
        description: "Please check your email and password.",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('your-background-image-url.jpg')" }}>
      {/* Main Content */}
      <div className="mt-6 max-w-md mx-auto p-6 bg-white bg-opacity-50 rounded-lg shadow-md backdrop-blur-md flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">{loading ? "Please Wait..." : "Login"}</Button>
          </form>
        </Form>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-pink-700 py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* About Section */}
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
              <a href="#" aria-label="Facebook" className="text-2xl hover:text-pink-300"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram" className="text-2xl hover:text-pink-300"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter" className="text-2xl hover:text-pink-300"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-200 text-sm">
          <p>&copy; 2024 Beauty Shop. All rights reserved.</p>
          <a href="#top" className="hover:underline">Back to Top</a>
        </div>
      </footer>
    </div>
  )
}

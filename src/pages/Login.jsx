import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useFetch } from "@/hooks/FetchContext"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '@/hooks/GlobalContext'


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(3, { message: "Password must be at least 6 characters long" }),
})

export default function Login() {

  const { post, loading, error } = useFetch()
  const {setUserData } = useGlobalContext()
  let goto = useNavigate()

  
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async  function onSubmit(values) {
    const response = await post('login',  values );

    if (response?.access_token) {

      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('active_user', response.isAdmin);
      localStorage.setItem('data', JSON.stringify(response.data));
      setUserData(response.data)
      toast({
        title: "Logged in successfully",
        description: "Welcome back to BeautyShop!",
      })
      goto("/products")
    } else {
      console.log('Login failed, no token received');

      toast({
        title: "Wrong Credentials",
        description: "Welcome back to BeautyShop!",
      })

    }
    
  }

  return (
    <>
      <div className="mt-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
            <Button type="submit" className="w-full">{loading ? "Please Wait .. " : "Login"}</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
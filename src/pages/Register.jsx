import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFetch } from '@/hooks/FetchContext'
import { useNavigate } from 'react-router-dom'



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
  // is_admin: z.boolean(), // Adding is_admin field as a boolean
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {

  const { toast } = useToast();
  const {post, loading, error } = useFetch()
  const goto = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      // is_admin: false, 
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {

    let submitForm = async () => {
      let response = await post("users", values)
      if(response.status){
        toast({
          title: "Account created successfully",
          description: "Welcome to BeautyShop!",
        })
        goto("/login")

      }else {

        toast({
          title: "Error:",
          description: response?.error,
        })
      }
    }

    submitForm()

  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                  <Input type="email" placeholder="Enter your email" {...field} />
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
              <Input type="tel" placeholder="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

        {/* <FormField
          control={form.control}
          name="is_admin"
          render={({ field }) => (
            <Select 
            onValueChange={(value) => field.onChange(value === "Admin")}
            >
              <SelectTrigger className="col-span-3">
              <FormLabel>Role:</FormLabel>
                <SelectValue placeholder="Select a role" className="text-red-700"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Customer"} >Customer</SelectItem>
                <SelectItem value={"Admin"}>Admin</SelectItem>
              </SelectContent>
            </Select>
          )}
        /> */}


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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">{ loading ? "Please Wait" : "Register" }</Button>
        </form>
      </Form>
    </div>
  )
}
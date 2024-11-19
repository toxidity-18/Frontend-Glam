import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { useGlobalContext } from "@/hooks/GlobalContext"; 



export default function ProductList() {
  const {products, addCart} = useGlobalContext()

const [category, setCategory] = useState("All")
const { toast } = useToast()



  const uniqueCategories = ["All", ...new Set(products.map(product => product.category_name))]

  const filteredProducts = category === "All" 
    ? products 
    : products.filter(product => product.category_name === category)

  const handleAddToCart = (product) => {
    addCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
      <Select onValueChange={setCategory} defaultValue="All">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {uniqueCategories.map((cat, index)=> (
            <SelectItem key={index} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
  filteredProducts.map(product => (
    <Card key={product.id}>
      <CardHeader>
        <AspectRatio ratio={16 / 9} className="justify-center flex align-middle">
          <img src={product.image_url} alt={product.name} className="object-cover mb-4 rounded-md" />
        </AspectRatio>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category_name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">KES {product.purchase_price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  ))
) : (
  <p className="text-gray-300 font-bold  align-middle">No products available.</p> 
)}

      </div>
    </div>
  )
}
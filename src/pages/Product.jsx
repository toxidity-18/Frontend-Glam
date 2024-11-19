// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"
// import Background from '@/components/Background'

// // Mock data - replace with actual API call in a real application
// const initialProducts = [
//   { id: 1, name: "Lipstick", category: "Makeup", price: 15.99, image: "/placeholder.svg?height=200&width=200" },
//   { id: 2, name: "Face Cream", category: "Skincare", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
//   { id: 3, name: "Shampoo", category: "Hair Care", price: 12.99, image: "/placeholder.svg?height=200&width=200" },
//   { id: 4, name: "Mascara", category: "Makeup", price: 18.99, image: "/placeholder.svg?height=200&width=200" },
//   { id: 5, name: "Moisturizer", category: "Skincare", price: 22.99, image: "/placeholder.svg?height=200&width=200" },
//   { id: 6, name: "Hair Conditioner", category: "Hair Care", price: 14.99, image: "/placeholder.svg?height=200&width=200" },
// ]

// export default function ProductList() {
//   const [products, setProducts] = useState(initialProducts)
//   const [category, setCategory] = useState("All")
//   const { toast } = useToast()

//   const filteredProducts = category === "All" 
//     ? products 
//     : products.filter(product => product.category === category)

//   const handleAddToCart = (product) => {
//     // In a real application, this would add the product to the cart state or send a request to the backend
//     toast({
//       title: "Added to Cart",
//       description: `${product.name} has been added to your cart.`,
//     })
//   }

//   return (
//     <>
//       <Background />
//       <div className="container mx-auto py-10 relative z-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-white">Our Products</h1>
//           <Select onValueChange={setCategory} defaultValue="All">
//             <SelectTrigger className="w-[180px] bg-white bg-opacity-90">
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All Categories</SelectItem>
//               <SelectItem value="Makeup">Makeup</SelectItem>
//               <SelectItem value="Skincare">Skincare</SelectItem>
//               <SelectItem value="Hair Care">Hair Care</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map(product => (
//             <Card key={product.id} className="bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg">
//               <CardHeader>
//                 <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
//                 <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
//                 <CardDescription>{product.category}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-bold text-purple-700">${product.price.toFixed(2)}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }
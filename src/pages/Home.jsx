import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to BeautyShop</h1>
      <p className="text-xl mb-8">Discover amazing beauty products for your perfect look!</p>
      <Button asChild>
        <Link to="/products">Shop Now</Link>
      </Button>
    </div>
  )
}
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useGlobalContext } from "@/hooks/GlobalContext";
import { Link } from 'react-router-dom';

export default function ProductList() {
  const { products, addCart } = useGlobalContext();
  const [category, setCategory] = useState("All");
  const { toast } = useToast();

  // Create a list of unique categories
  const uniqueCategories = ["All", ...new Set(products.map(product => product.category_name))];

  // Filter products based on selected category
  const filteredProducts = category === "All"
    ? products
    : products.filter(product => product.category_name === category);

  // Add to cart handler
  const handleAddToCart = (product) => {
    addCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <Select onValueChange={setCategory} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCategories.map((cat, index) => (
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
          <p className="text-gray-300 font-bold align-middle">No products available.</p>
        )}
      </div>

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
  );
}

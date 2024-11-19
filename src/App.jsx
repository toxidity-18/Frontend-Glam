import React, { useEffect } from 'react'
import {  Routes, Route } from 'react-router-dom'
import Header from './components/ui/Header'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminUsers from './pages/AdminUsers'
import Background from './components/Background'
import { Toaster } from "@/components/ui/toaster"
import { useGlobalContext } from './hooks/GlobalContext'
import { useFetch } from './hooks/FetchContext'
import AdminCategories from './pages/AdminCategories'
import AdminSuppliers from './pages/AdminSuppliers'

function App() {
  const { setProducts, setfetchedCategories, setfetchedSupplier,user, userData, setUserData} = useGlobalContext()
  const { get: getProduct, get: fetchCategory,get: fetchSupplier, } = useFetch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct("products");
        const resFetch = await fetchCategory("product_categories")
        const resSupplier = await fetchSupplier("suppliers")
        setProducts(response); 
        setfetchedCategories(resFetch)
        if(Array.isArray(resSupplier)){
          setfetchedSupplier(resSupplier)
        }

      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const storedUser = localStorage.getItem("data");
    if (storedUser) {
      // Parse the stored JSON and update the state
      setUserData(JSON.parse(storedUser));
    }
  
    fetchProducts();
  }, [getProduct,user]);



  return (
      <div className="flex flex-col min-h-screen ">
        <Background/>
        <Header />
        <main className="flex-grow p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productCategory" element={<AdminCategories />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/suppliers" element={<AdminSuppliers />} />
          </Routes>
        </main>
        <Toaster />
      </div>
  )
}

export default App
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data - replace with actual API calls
const productData = [
  { name: 'Lipstick', sales: 4000, revenue: 2400 },
  { name: 'Face Cream', sales: 3000, revenue: 1398 },
  { name: 'Shampoo', sales: 2000, revenue: 9800 },
  { name: 'Mascara', sales: 2780, revenue: 3908 },
  { name: 'Nail Polish', sales: 1890, revenue: 4800 },
]

const orderData = [
  { date: '2023-01', orders: 65, revenue: 4000 },
  { date: '2023-02', orders: 59, revenue: 3000 },
  { date: '2023-03', orders: 80, revenue: 5000 },
  { date: '2023-04', orders: 81, revenue: 4900 },
  { date: '2023-05', orders: 56, revenue: 3800 },
  { date: '2023-06', orders: 55, revenue: 3600 },
]

export default function AdminAnalytics() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Product Analytics</TabsTrigger>
          <TabsTrigger value="orders">Order Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales and revenue by product</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Number of orders and revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
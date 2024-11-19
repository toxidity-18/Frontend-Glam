import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useFetch } from '@/hooks/FetchContext'

export default function AdminProducts() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const { toast } = useToast()
  const { products, setProducts, fetchedCategories, fetchedSupplier } = useGlobalContext()
  const { del: delProduct, post: addProductAPI, put: editProductAPI } = useFetch()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      category_id: categoryId,
    }));
  };


    // Handle category selection
    const handleSupplierChange = (suppId) => {
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        supplier_id: suppId,
      }));
    };


  // Add Product
  const handleAddProduct = async () => {
    try {
      const newProduct = { ...currentProduct};
      let res = await addProductAPI('products', newProduct);
      setProducts(prev => [...prev, res]);
      setIsAddDialogOpen(false);
      toast({
        title: "Product Added",
        description: `${currentProduct.name} has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    }
  };

  // Edit Product
  const handleEditProduct = async () => {
    try {
      await editProductAPI(`products/${currentProduct.id}`, currentProduct);
      setProducts(prev => prev.map(product => product.id === currentProduct.id ? currentProduct : product));
      setIsEditDialogOpen(false);
      toast({
        title: "Product Updated",
        description: `${currentProduct.name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    }
  };

  // Delete Product
  const handleDeleteProduct =  (id) => {
    
     delProduct(`products/${id}`);
    setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully.",
        variant: "destructive",
      });

  };

  const openAddDialog = () => {
    setCurrentProduct({ name: '', category_id: '',description: '', purchase_price: '', price: '',stock_quantity: '', supplier_id: '', image_url: '' });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <Button onClick={openAddDialog} className="mb-4">Add New Product</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Buying Price</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover mb-4 rounded-md" />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category_name}</TableCell>
              <TableCell>KES {product.purchase_price}</TableCell>
              <TableCell>{product.supplier_name}</TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => openEditDialog(product)} className="mr-2">Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>7
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" placeholder="Product Name" className="col-span-3" value={currentProduct?.name || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Supplier</Label>
              <Select name="category" onValueChange={handleSupplierChange} value={currentProduct?.supplier_id || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {fetchedSupplier.map(supp => (
                    <SelectItem key={supp.id} value={supp.id}>{supp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select name="category" onValueChange={handleCategoryChange} value={currentProduct?.category_id || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {fetchedCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">Buying Price</Label>
              <Input id="edit-price" name="price" type="number" placeholder="Price" className="col-span-3" value={currentProduct?.price || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">Selling Price</Label>
              <Input id="edit-price" name="purchase_price" type="number" placeholder="Price" className="col-span-3" value={currentProduct?.purchase_price || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" name="stock_quantity" type="number" placeholder="Stock" className="col-span-3" value={currentProduct?.stock_quantity || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Description</Label>
              <Input id="stock" name="description" type="text" placeholder="Description" className="col-span-3" value={currentProduct?.description || ''} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">Image URL</Label>
              <Input id="image_url" name="image_url" placeholder="Image URL" className="col-span-3" value={currentProduct?.image_url || ''} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input id="edit-name" name="name" placeholder="Product Name" className="col-span-3" value={currentProduct?.name || ''} onChange={handleInputChange} />
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Supplier</Label>
              <Select name="supplier_id" onValueChange={handleSupplierChange} value={currentProduct?.supplier_id || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {fetchedSupplier.map(supp => (
                    <SelectItem key={supp.id} value={supp.id}>{supp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">Category</Label>
              <Select name="category" onValueChange={handleCategoryChange} value={currentProduct?.category_id || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {fetchedCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">Buying Price</Label>
              <Input id="edit-price" name="price" type="number" placeholder="Price" className="col-span-3" value={currentProduct?.price || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">Selling Price</Label>
              <Input id="edit-price" name="purchase_price" type="number" placeholder="Price" className="col-span-3" value={currentProduct?.purchase_price || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right">Stock</Label>
              <Input id="edit-stock" name="stock_quantity" type="number" placeholder="Stock" className="col-span-3" value={currentProduct?.stock_quantity || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image_url" className="text-right">Image URL</Label>
              <Input id="edit-image_url" name="image_url" placeholder="Image URL" className="col-span-3" value={currentProduct?.image_url || ''} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

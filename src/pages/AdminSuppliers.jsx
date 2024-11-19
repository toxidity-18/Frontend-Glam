import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useFetch } from '@/hooks/FetchContext'
import { Label } from '@/components/ui/label'

export default function AdminSuppliers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState(null)
  const { toast } = useToast()
  const { fetchedSupplier, setfetchedSupplier } = useGlobalContext()
  const { del: delCategory, post: addCategoryAPI, put: editCategoryAPI } = useFetch()

  // Handle input changes for category name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupplier((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Add Category
  const handleAddCategory = async () => {
    try {
      const newCategory = { ...currentSupplier };
      let res = await addCategoryAPI('suppliers', newCategory);
      setfetchedSupplier(prev => [...prev, res]);
      setIsAddDialogOpen(false);
      toast({
        title: "Supplier Added",
        description: `${currentSupplier.name} has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add Supplier.",
        variant: "destructive",
      });
    }
  };

  // Edit Category
  const handleEditCategory = async () => {
    try {
      await editCategoryAPI(`suppliers/${currentSupplier.id}`, currentSupplier);
      setfetchedSupplier(prev => prev.map(category => category.id === currentSupplier.id ? currentSupplier : category));
      setIsEditDialogOpen(false);
      toast({
        title: "Supplier Updated",
        description: `${currentSupplier.name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update Supplier.",
        variant: "destructive",
      });
    }
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    delCategory(`suppliers/${id}`);
    setfetchedSupplier(prev => prev.filter(category => category.id !== id));
    toast({
      title: "Supplier Deleted",
      description: "The category has been deleted successfully.",
      variant: "destructive",
    });
  };

  const openAddDialog = () => {
    setCurrentSupplier({ name: '' });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setCurrentSupplier(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Supplier</h1>
      <Button onClick={openAddDialog} className="mb-4">Add New Supplier</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedSupplier?.map(category => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.contact_info}</TableCell>
              <TableCell>{category.address}</TableCell>
              <TableCell>{category.created_at}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => openEditDialog(category)} className="mr-2">Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Supplier Name</Label>
              <Input id="name" name="name" placeholder="Supplier Name" className="col-span-3" value={currentSupplier?.name || ''} onChange={handleInputChange} />
            </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact_info" className="text-right">Supplier Email</Label>
              <Input id="name" name="contact_info" placeholder="Supplier Email" className="col-span-3" value={currentSupplier?.contact_info || ''} onChange={handleInputChange} />
            </div>
          </div>


          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Supplier Address</Label>
              <Input id="name" name="address" placeholder="Supplier Address" className="col-span-3" value={currentSupplier?.address || ''} onChange={handleInputChange} />
            </div>
          </div>

          </div>
          <DialogFooter>
            <Button onClick={handleAddCategory}>Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Supplier Name</Label>
              <Input id="edit-name" name="name" placeholder="Category Name" className="col-span-3" value={currentSupplier?.name || ''} onChange={handleInputChange} />
            </div>

            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact_info" className="text-right">Supplier Email</Label>
              <Input id="name" name="contact_info" placeholder="Category Name" className="col-span-3" value={currentSupplier?.contact_info || ''} onChange={handleInputChange} />
            </div>
          </div>


          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Supplier Address</Label>
              <Input id="name" name="address" placeholder="Category Name" className="col-span-3" value={currentSupplier?.address || ''} onChange={handleInputChange} />
            </div>
          </div>

          </div>
          <DialogFooter>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

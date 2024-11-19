import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useGlobalContext } from '@/hooks/GlobalContext'
import { useFetch } from '@/hooks/FetchContext'
import { Label } from '@/components/ui/label'

export default function AdminCategories() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const { toast } = useToast()
  const { fetchedCategories, setfetchedCategories } = useGlobalContext()
  const { del: delCategory, post: addCategoryAPI, put: editCategoryAPI } = useFetch()

  // Handle input changes for category name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Add Category
  const handleAddCategory = async () => {
    try {
      const newCategory = { ...currentCategory };
      let res = await addCategoryAPI('product_categories', newCategory);
      setfetchedCategories(prev => [...prev, res]);
      setIsAddDialogOpen(false);
      toast({
        title: "Category Added",
        description: `${currentCategory.name} has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
    }
  };

  // Edit Category
  const handleEditCategory = async () => {
    try {
      await editCategoryAPI(`product_categories/${currentCategory.id}`, currentCategory);
      setfetchedCategories(prev => prev.map(category => category.id === currentCategory.id ? currentCategory : category));
      setIsEditDialogOpen(false);
      toast({
        title: "Category Updated",
        description: `${currentCategory.name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category.",
        variant: "destructive",
      });
    }
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    delCategory(`product_categories/${id}`);
    setfetchedCategories(prev => prev.filter(category => category.id !== id));
    toast({
      title: "Category Deleted",
      description: "The category has been deleted successfully.",
      variant: "destructive",
    });
  };

  const openAddDialog = () => {
    setCurrentCategory({ name: '' });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
      <Button onClick={openAddDialog} className="mb-4">Add New Category</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedCategories.map(category => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
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
              <Label htmlFor="name" className="text-right">Category Name</Label>
              <Input id="name" name="name" placeholder="Category Name" className="col-span-3" value={currentCategory?.name || ''} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Category Name</Label>
              <Input id="edit-name" name="name" placeholder="Category Name" className="col-span-3" value={currentCategory?.name || ''} onChange={handleInputChange} />
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

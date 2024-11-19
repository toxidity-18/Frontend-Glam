import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useFetch } from '@/hooks/FetchContext'
import { useGlobalContext } from '@/hooks/GlobalContext'


export default function AdminUsers() {
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { toast } = useToast()
  const {get: fetchAllUsers, del: userDelete, put: updateUser } = useFetch()
  const {allUser, setAllUsers } = useGlobalContext()

  useEffect(() =>  {

    let res = async ()  => {
      let data = await fetchAllUsers("users")
      setAllUsers(data)
      if(data?.msg){
        toast({
          title: "Error",
          description: data['msg'],
          variant: "destructive",
        });
        return
      }
      setAllUsers(data)
    }
    res()

  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentUser(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setCurrentUser(prev => ({ ...prev, is_admin: value }))
  }


  const handleEditUser = () => {
    updateUser(`users/${currentUser.uid}`, currentUser)
    setAllUsers(prev => prev.map(user => user.uid === currentUser.uid ? currentUser : user))
    setIsEditDialogOpen(false)
    toast({
      title: "User Updated",
      description: `${currentUser.name} has been updated successfully.`,
    })
  }

  const handleDeleteUser = (id) => {

    userDelete(`users/${id}`)
    
    setAllUsers(prev => prev.filter(user => user.uid !== id))
  toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
      variant: "destructive",
    })
  }


  const openEditDialog = (user) => {
    setCurrentUser(user)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Users <i className="text-xl">({allUser.length})</i> </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUser?.map(user => (
            <TableRow key={user.uid}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.is_admin == true ? "Admin" : "Customer"}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => openEditDialog(user)} className="mr-2">Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteUser(user.uid)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input id="edit-name" name="name" placeholder="User Name" className="col-span-3" value={currentUser?.name || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input id="edit-email" name="email" placeholder="Email" className="col-span-3" value={currentUser?.email || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">Role</Label>
              <Select name="is_admin" onValueChange={handleRoleChange} value={currentUser?.is_admin || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={false}>Customer</SelectItem>
                  <SelectItem value={true}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// import React, { useEffect, useState } from "react"

// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge";
// import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


// export default function AllProduct() {
//   const [sorting, setSorting] = useState([])
//   const [columnFilters, setColumnFilters] = useState([])
//   const [columnVisibility, setColumnVisibility] = useState({})
//   const [rowSelection, setRowSelection] = useState({})
// const [product, setProducts] = useState([])

// useEffect(() => {

//   fetch('http://127.0.0.1:5000/products')
// .then(response => response.json())  
// .then(data => {
//     setProducts(data)
// })
// .catch(error => {
//     console.error('Error:', error);  // Handle any errors
// });

// }, [])


// const data = product
// const columns = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "image_url",
//     header: "Image",
//     cell: ({ row }) => (

//       <img
//         alt="Product image"
//         className="aspect-square rounded-md object-cover"
//         height="64"
//         src={row.getValue("image_url")}
//         width="64"
//       />

//     ),
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="outline"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="ml-2 h-4 w-4 text-nowrap" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//     cell: ({ row }) => (
//       <div className="capitalize text-nowrap">  KES {row.getValue("price")}</div>
//     ),
//   },
//   {
//     accessorKey: "category_name",
//     header: "Category",
//     cell: ({ row }) => (
//       <div className="capitalize text-nowrap">  {row.getValue("category_name")}</div>
//     ),
//   },
//   {
//     accessorKey: "stock",
//     header: "Stock",
//     cell: ({ row }) => (
//       <div className="capitalize text-nowrap">  {row.getValue("stock")}</div>
//     ),
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => (
//       <div className="capitalize text-nowrap">  {row.getValue("description")}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="outline"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Status
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="text-center">
//     <Badge variant={row.getValue("status") == true ? 2 : 1}>{row.getValue("status") == true ? "Active" :  "Dormant" }</Badge>
//     </div>,
//   },
// ]

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

  
//   return (
//     <Card className="  p-0">
//    <CardHeader>
//   <CardTitle>Products</CardTitle>
//   <CardDescription>
//     Manage your products and view their sales performance.
//   </CardDescription>
// </CardHeader>

//     <div className="w-full b ">
//       <div className="lg:flex md:flex grid grid-cols-2  gap-2  py-4">
//         <Input
//           placeholder="Filter Name..."
//           value={(table.getColumn("name")?.getFilterValue()) ?? ""}
//           onChange={(event) =>
//             table.getColumn("name")?.setFilterValue(event.target.value)
//           }
//           className="m-full col-span-2 row-span-1 "
//         />

//             <Button variant="outline" disabled className=" place-self-left w-26 m-0">
//               Total {product.length} 
//             </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className=" place-self-left w-26 m-0">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>

//             {/* <Button variant="outline" disabled className=" place-self-left w-26 m-0 ">
//               Active {fetchTeam['active']} 
//             </Button> */}

//             {/* <Button variant="outline" disabled className=" place-self-left w-26 m-0 ">
//               Inactive {fetchTeam['inactive']} 
//             </Button> */}

//       </div>
//       <div className="rounded-md borded  overflow-x-auto overflow-y-hidden">
//         <Table >
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                           </TableHead>
//                         )
//                       })}
//                     </TableRow>
//                   ))}
//                 </TableHeader>
//                 <TableBody>
//                   {table.getRowModel().rows?.length ? (
//                     table.getRowModel().rows.map((row) => (
//                       <TableRow
//                       key={row.id}
//                       data-state={row.getIsSelected() && "selected"}
//                       className={row.original.status != true ? "bg-orange-600 text-black" : null}
//                       >
//                         {row.getVisibleCells().map((cell) => (
//                           <TableCell key={cell.id} className="p-3">
//                             {flexRender(
//                               cell.column.columnDef.cell,
//                               cell.getContext()
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={columns.length}
//                         className="h-24 text-center"
//                         >
//                         No Products.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4">
//               <div className="flex-1 text-sm text-muted-foreground">
//                 {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                 {table.getFilteredRowModel().rows.length} row(s) selected.
//               </div>
//               <div className="space-x-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => table.previousPage()}
//                   disabled={!table.getCanPreviousPage()}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => table.nextPage()}
//                   disabled={!table.getCanNextPage()}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </div>
//     </Card>

//         )
//       }
      
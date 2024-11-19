import React, { useState } from 'react';
import { FolderPlus, Folders, PackagePlus, Package, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';  // Update to import Link from react-router-dom

const navItems = [
  { name: 'New Category', icon: FolderPlus, to: '/new-category' },  // Change href to 'to'
  { name: 'All Categories', icon: Folders, to: '/categories' },     // Change href to 'to'
  { name: 'New Product', icon: PackagePlus, to: '/new-product' },    // Change href to 'to'
  { name: 'All Products', icon: Package, to: '/products' },         // Change href to 'to'
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">E-Store</span>
              {/* </a> */}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.name} to={item.to} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} to={item.to}
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-900  px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

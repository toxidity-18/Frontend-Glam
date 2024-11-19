// src/context/GlobalContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create a Context
const GlobalContext = createContext();

// 2. Create a Provider Component
export const GlobalProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [summary, setSummary] = useState([]);
  const [adminOrder, setAdminOrders] = useState([]);
  const [clietOrder, setClietOrders] = useState([]);
  const [clietProduct, setClietProducts] = useState([]);
  const [clientTransaction, setclientTransactions] = useState([]);
  const [allUser, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, seCart] = useState([]);
  const [fetchedCategories, setfetchedCategories] = useState([]);
  const [fetchedSupplier, setfetchedSupplier] = useState([]);

useEffect(() => {
let fromLocal = localStorage.getItem("active_user")

if(fromLocal){

  setUser(fromLocal === "true" ? true : null)
}


}, [])

  const addCart = (newProduct) => {
    seCart((prev) => [...prev, newProduct]);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        products,
        setProducts,
        cart,
        addCart,
        seCart,
        fetchedCategories,
        setfetchedCategories,
        fetchedSupplier, 
        setfetchedSupplier,
        allUser,
        setAllUsers,
        summary, setSummary,
        adminOrder, setAdminOrders,
        clientTransaction, setclientTransactions,
        clietOrder, setClietOrders,
        clietProduct, setClietProducts
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

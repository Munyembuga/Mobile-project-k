import { create } from "zustand";
import axios from "axios";
import { CartFetch } from "../Sreens/User/Cart/CartPage";
import { useSelector } from "react-redux";
// const {authToken } = useSelector((state) => state.auth);

export const useBadgeStore = create((set) => ({

    badge: 0,
    isLoading:false,
    error:null, 
    data:[],
    Image:"", 
    counter:"",
  
    increaseBadge: () => set((state) => ({ badge: state.badge + 1 })),
    increaseBadgeWithId: (item, id) => set((state) => ({ badge: state.badge + 1 })),
    setBadge:(item)=> set(() => ({ badge: item })),
    decreaseBadge: () => set((state) => ({ badge: state.badge - 1 })),
    removeBadge: () => set({ badge: 0 }),
    addImage: (item)=> set(()=>({Image: item})),
    setImage: (item)=> set(()=>({Image:item})),
    updateLastName: (lastName) => set(() => ({ lastName: lastName })),
  }))


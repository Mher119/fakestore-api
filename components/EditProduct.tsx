'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    fetchProductById,
    updateProduct,
    clearCurrent
} from '@/store/productsSlice';

import { useAppDispatch, useAppSelector } from "@/store/hooks";


export function EditProduct({id}: {id: string}) {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { current, status } = useAppSelector((state) => state.products);
    const [title, setTitle] = useState('');


    useEffect(()=>{
        dispatch(fetchProductById(Number(id)));

        return ()=>{
            dispatch(clearCurrent());
        }

    }, [id, dispatch]);


    useEffect(()=>{
        if(current){
            setTitle(current.title)
        }
        
    }, [current])

    if(status === 'loading' || !current) return <p>Loading...</p>


    const handleSave = async() => {
        const res = await dispatch(updateProduct({id: current.id, title})).unwrap();
        console.log(res);
        router.push(`/products/${current.id}`);
    }


  return (
    <div className="">
        <h1 className=" text-2xl font-bold italic text-center">Editing Product {current.title}</h1>
        
        <div>
            <label>Product Title: </label>
            <input 
                type="text" 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)} 
                className=" outline-0 border-b-2 border-b-gray-400"
            />
        </div>
     
        <button 
            className=" px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
        >
            Save</button>
    </div>
  )
}

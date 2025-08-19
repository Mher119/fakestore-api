'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchProductById, deleteProduct, clearCurrent } from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import noImg from '@/public/no_image.png';


export function ProductDetail({id}: {id: string}) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {current, status, error} = useAppSelector(state => state.products);

    useEffect(()=>{
        if(!id)  return;
        dispatch(fetchProductById(Number(id)));

        return ()=>{
            dispatch(clearCurrent());
        }

    }, [id, dispatch]);

    if(status === 'loading') return <p className="p-8">Loading ...</p>
    if(status === 'failed') return <p className="p-8">{error}</p>
    if(status === 'succesed' && !current) return <p className="p-8">No Result</p>
    if(!current) return;


    const handleDelete = async() =>{
       try {
         const statusCode = await dispatch(deleteProduct(current.id)).unwrap();
         console.log(statusCode);
         
         router.push('/products');
       } catch (error) {
            console.error(error);
       }

    }


    return <div>
        <Image 
            src={current &&  current.image ? current.image : noImg}
            alt={current.title}
            width={500}
            height={500}
            priority={false}
            placeholder={'blur'}
            blurDataURL={noImg.blurDataURL}
            quality={100}
            style={{width: 'auto', height: 'auto'}}
        />
        <h1 className=" text-2xl font-bold">{current.title}</h1>
        <p className="text-lg">{current.description}</p>
        <p className="text-lg">Price: {current.price}</p>
        <button className="bg-blue-500 p-2 text-white rounded-md cursor-pointer" onClick={()=> router.push(`/products/${id}/edit`)}>edit</button>
        <button className="bg-red-500 p-2 text-white rounded-md cursor-pointer" onClick={handleDelete}>Delete</button>

    </div>

}

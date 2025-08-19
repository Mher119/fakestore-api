'use client';

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productsSlice";
import Link from "next/link";
import Image from "next/image";

import noImg from '@/public/no_image.png';


export default function Products(){
    const dispatch = useAppDispatch();
    const {list, status, error} = useAppSelector((state) => state.products);


    useEffect(()=>{
        if(status === 'idle'){
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    if(status === 'loading') return <p>Loading ...</p>
    if(status === 'failed') return <p>Error: {error}</p>

    return (
       <div className=" container mx-auto">

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {list.map(p=> <li key={p.id} className=" shadow-md p-2">
                    <Link href={`/products/${p.id}`}>
                             <Image 
                                src={p && p.image? p.image : noImg}
                                alt={p.title}   
                                width={300}
                                height={300}   
                                priority          
                                placeholder={'blur'}
                                blurDataURL={noImg.blurDataURL}
                                style={{
                                    objectFit: 'cover',
                                    // width: 'auto',
                                    // height: 'auto'
                                    width: '100%',
                                    height: '300px'
                                }}
                            />   
                        <div className=" italic text-xl">{p.title}</div>
                        <div className=" font-bold">Price: {p.price} $</div>           
                    </Link>
                </li>)}
            </ul>

       </div>
    );

}
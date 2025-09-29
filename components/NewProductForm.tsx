'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewProductForm(){
    const router = useRouter();
    
    const [product, setProduct] = useState({
        title: '',
        price: '',	
        description: '',
        category: '',	
        image: ''
    });

 
    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        
        router.push('/products')
    } 

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
         //e.target.value e.target.name
         setProduct({...product, [e.target.name]: e.target.value});
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label>Product Title:</label>
            <input type="text" value={product.title} name='title' onChange={changeHandler} />
        </div>
        <div>
            <label>Product Price:</label>
            <input type="text" value={product.price} name='price' onChange={changeHandler} />
        </div>
        <div>
            <label>Product Descr:</label>
            <input type="text" value={product.description} name='description' onChange={changeHandler} />
        </div>
        <div>
            <label>Product Category:</label>
            <input type="text" value={product.category} name='category' onChange={changeHandler} />
        </div>
        <div>
            <label>Product Image:</label>
            <input type="text" value={product.image} name='image' onChange={changeHandler} />
        </div>
        <button type="submit">CREATE</button>

    </form>
}

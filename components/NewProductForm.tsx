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


    const handeSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        // возвращающая не сам Action, а прямо его payload
        // const d = await dispatch(createProduct({...product, price: parseFloat(product.price)})).unwrap();
        
        router.push('/products')
    }

    const changeHanlder = (e: React.ChangeEvent<HTMLInputElement>)=>{
         //e.target.value e.target.name
         setProduct({...product, [e.target.name]: e.target.value});
    }

    return <form onSubmit={handeSubmit}>
        <div>
            <label>Product Title:</label>
            <input type="text" value={product.title} name='title' onChange={changeHanlder} />
        </div>
        <div>
            <label>Product Price:</label>
            <input type="text" value={product.price} name='price' onChange={changeHanlder} />
        </div>
        <div>
            <label>Product Descr:</label>
            <input type="text" value={product.description} name='description' onChange={changeHanlder} />
        </div>
        <div>
            <label>Product Category:</label>
            <input type="text" value={product.category} name='category' onChange={changeHanlder} />
        </div>
        <div>
            <label>Product Image:</label>
            <input type="text" value={product.image} name='image' onChange={changeHanlder} />
        </div>
        <button>CREATE</button>

    </form>
}


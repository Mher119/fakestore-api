import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import  axios from 'axios';

import { Product } from "@/types";

const BASE_URL = 'https://fakestoreapi.com/products';

type ProdutsState = {
    list: Product[];
    current: Product | null;
    status: 'idle' | 'loading' | 'succesed' | 'failed',
    error: string | null,
}

const initialState: ProdutsState = {
    list: [],
    current: null,
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async()=>{
        const res = await axios.get<Product []>(BASE_URL);
        const data = res.data;
        return data;
    }
);

export const fetchProductById = createAsyncThunk<Product, number>(
    'products/fetchProductById',
    async(id)=>{
        const res = await axios.get<Product>(`${BASE_URL}/${id}`);
        const data = res.data;
        return data;
    } 
);

// Omit<Product, 'id'> — это встроенный утилитный дженерик TypeScript, 
// который «забирает» все свойства из Product, кроме указанного ключа ('id')
export const createProduct = createAsyncThunk<Product, Omit<Product, 'id'> >(
    'products/createProduct',
    async(newProduct)=>{
        const res = await axios.post<Product>(BASE_URL, newProduct);
        const data = res.data;
        return data;
    }
);

// Первый дженерик — что вернёт thunk (Returned), у тебя это Product.
// Второй — что передаёшь в dispatch(thunk(arg)) (ThunkArg), у тебя это { id: number; title: string }.
export const updateProduct = createAsyncThunk<Product, {id: number, title: string}>(
    'products/updateProduct',
    async(product)=>{
        console.log(product);
        const res = await axios.put<Product>(`${BASE_URL}/${product.id}`, product);
        const data = res.data;
        return data;
    }
);


// Первый number говорит: «этот thunk возвращает number (HTTP-статус)».
// Второй number говорит: «этот thunk принимает в качестве аргумента id: number».
export const deleteProduct = createAsyncThunk<number, number>(
    'products/deleteProduct',
    async(id)=>{
        const res = await axios.delete(`${BASE_URL}/${id}`);
        const statusCode = res.status;
        return statusCode;
    }
);


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        clearCurrent(state){
            state.current = null;
        }
    },
    extraReducers: (builder)=>{
        builder
        // fetchALL
        .addCase(fetchProducts.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>)=>{
            state.status = 'succesed';
            state.list = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })

        // fetchById
        .addCase(fetchProductById.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>)=>{
            state.status = 'succesed';
            state.current = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })

        // create
        .addCase(createProduct.fulfilled, (state, action:PayloadAction<Product>)=>{
            state.list.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })

        //update
        .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>)=>{
            state.list = state.list.map(p =>
                p.id === action.payload.id ? action.payload : p
            )
            if(state.current?.id === action.payload.id){
                state.current = action.payload;
            }
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })

        // delete
        .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>)=>{
            state.list = state.list.filter(p => p.id !== action.payload);
            if(state.current?.id === action.payload){
                state.current = null;
            }
        })
    }
});

export const {clearCurrent} = productSlice.actions;
export default productSlice.reducer;
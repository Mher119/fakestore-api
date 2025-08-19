import { EditProduct } from "@/components/EditProduct";


type Params = {
    params: Promise<{id: string}>
}

export default async function EditProductPage({params}: Params){
    const {id} = await params;


    return <div>
        <EditProduct id={id} />
    </div>
}
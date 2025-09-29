import { ProductDetail } from "@/components/ProductDetail";

type Params = {
    params: Promise<{id: string}>
}

export default async function ProductPage({params}: Params){
    const {id} = await params;

    return <div>
        <ProductDetail id={id} />
    </div>

}
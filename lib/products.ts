import prisma from "./prisma";






const productSelect = {

    id : true,
    name : true,
    orders : true
}



    // Prisma client may not have a typed `product` property depending on how it's generated/exported.
    // Cast to `any` to avoid TS errors while still calling the runtime method.
    
/** Two parallel queries run via Promise.all — one round-trip */
export async function getAllproducts() {
    // prisma client may not expose a strongly typed `product` property depending on generation.
    // Cast to any to avoid TS errors while still calling the runtime method.


    const [products]  =  await Promise.all([

        (prisma as any).product.findMany({
        where: {
            id: productSelect.id,
            name: productSelect.name,
            orders:productSelect.orders
        },

        select : productSelect
    })

    ])


return {products}
        
}

export type ProductItem = Awaited<
  ReturnType<typeof prisma.product.findMany>>[number]



/** Two parallel queries run via Promise.all — one round-trip */
// (kept for backward compatibility) alias






/** Type inference from the Prisma select shape */



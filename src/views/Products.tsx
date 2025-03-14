/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  //console.log("Desde loader");

  const products = await getProducts();

  // console.log(products);

  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  //console.log(data);
  await updateProductAvailability(+data.id);

  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[]; // Obtener los datos del loader, se puede nombrar como se quiera
  // console.log(products);
  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Disponibilidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((producto) => (
                <ProductDetails key={producto.id} product={producto} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className=" my-10 text-center text-xl text-gray-800">
          No hay productos registrados
        </p>
      )}
    </>
  );
}

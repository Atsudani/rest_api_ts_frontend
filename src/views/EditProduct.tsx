/* eslint-disable react-refresh/only-export-components */
import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
// import ErrorMessage from "../components/ErrorMessage";
import { getProductsById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  // console.log("desde loader....");
  //el loeader se ejecuta antes de renderizar el componente

  // getProductsById(+params.id!);
  if (params.id !== undefined) {
    const product = await getProductsById(+params.id);

    if (!product) {
      return redirect("/");
    }

    // console.log(product);
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  // if (params.id !== undefined) {
  //   const productData: Product = {
  //     id: Number(params.id),
  //     name: data.name as string,
  //     price: Number(data.price),
  //     availability: true, // or set this based on your form data
  //   };
  //   await updateProduct(productData, Number(params.id)); // Esperar a que se registre el producto
  // }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id); // Esperar a que se registre el producto
  }
  return redirect("/");
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      {error && toast.error(error)}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}

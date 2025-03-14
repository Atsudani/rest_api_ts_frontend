/* eslint-disable react-refresh/only-export-components */
import {
  Link,
  Form,
  // useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
// import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    toast.error(error);
    return error;
  }

  await addProduct(data); // Esperar a que se registre el producto
  return redirect("/");
}

export default function NewProduct() {
  // const error = useActionData() as string;

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      {/* {error && toast.error(error)} */}

      <Form className="mt-10" method="POST">
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-violet-300"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

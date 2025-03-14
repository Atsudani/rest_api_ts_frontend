import {
  /*Link,*/ ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom";
import { formatCurrency } from "../helpers";
import { Product } from "../types";
import { deleteProduct } from "../services/ProductService";
import Swal from "sweetalert2"; // 🔥 Importamos SweetAlert2

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteProduct(+params.id);

      // 🔥 Notificación de éxito
      await Swal.fire({
        title: "¡Eliminado!",
        text: "El producto fue eliminado con éxito.",
        icon: "success",
        timer: 2000, // Se cierra en 2 seg.
        showConfirmButton: false,
      });

      return redirect("/");
    }
  }
  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability ? "Disponible" : "No disponible";

  const fetcher = useFetcher();
  const navigate = useNavigate(); // Hook to navigate programmatically
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {
          // el useFetcher lo que hace es que el formulario se envie de forma asincrona, sin recargar la pagina
        }
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              product.availability ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-slate-500 hover:bg-gray-400`}
          >
            {isAvailable}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className=" flex gap-2 items-center">
          {
            /* <Link
            to={`productos/${product.id}/editar`}
            className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </Link> */
            //puedo usar link o navigate, para este caso usare navigate, realmente me gusta mas link
          }
          <button
            onClick={() => navigate(`productos/${product.id}/editar`)}
            className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>

          <Form
            className=" w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`} // le especifico el action porque la ruta actual no tiene definido el action..
            //el onSubmit se ejecuta antes de enviar el formulario, por lo tanto si el usuario no confirma la eliminacion, no se ejecutara el action
            // onSubmit={(e) => {
            //   if (!confirm("Eliminar producto?")) {
            //     e.preventDefault();
            //   }
            // }}
          >
            <input
              type="submit"
              value="Eliminar"
              className=" bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}

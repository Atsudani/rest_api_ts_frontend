import { Product } from "../types";

type ProductFormProps = {
  product?: Product; //el prop product lo hacemos opcional
};

export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Producto"
          name="name"
          // defaultValue={state.product.name} //solo funcionara si se envia el state desde el componente productDetails, especificamente desde el boton editar
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          // defaultValue={state.product.price}
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}

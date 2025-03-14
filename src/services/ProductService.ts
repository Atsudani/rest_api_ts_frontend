import { safeParse } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toast } from "react-toastify";
// import { deleteProduct } from "../../../server/src/handlers/product";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    // Si la validacion es exitosa, enviar los datos al servidor
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`; // URL del servidor, definida en .env

      await axios.post(url, {
        name: result.output.name, // Enviar los datos validados con valibot al servidor
        price: result.output.price, // Enviar los datos validados con valibot al servidor
      });
    } else {
      throw new Error("Datos no validos");
    }

    toast.success("Producto agregado");
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsById(id: Product["id"]) {
  // accedo al type id de product mediante la notacion de punto, que en ingles es dot notation
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: data.availability === "true",
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

      await axios.put(url, result.output);

      toast.success("Producto actualizado");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);

    toast.success("Disponibilidad actualizada");
  } catch (error) {
    console.log(error);
  }
}

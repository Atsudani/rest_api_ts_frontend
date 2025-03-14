import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader, // Load data for the Products view
        action: updateAvailabilityAction, // Update availability of a product
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction, // sirve para enviar datos al servidor
      },
      {
        path: "productos/:id/editar", // ROA patter - resource oriented architecture
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },

      {
        path: "productos/:id/eliminar", // El form se comunica via action con este path, para eliminar un producto
        action: deleteProductAction,
      },
    ],
  },
]);

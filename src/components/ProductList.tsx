import React from "react";
import { ProductType } from "../Types";
import { useDeleteProductMutation, useUpdateProductMutation } from "../redux";

interface Props {
  item: ProductType;
}

export const ProductList: React.FC<Props> = ({ item }) => {
  const [value, setValue] = React.useState(item.name);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, {isSuccess}] = useUpdateProductMutation()

  const handleUpdateProduct = async (id: string) => {
    await updateProduct({id, name: value}).unwrap();
    console.log(isSuccess);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
  };

  return (
    <div style={{ display: "flex" }}>
      <li key={item.id}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </li>
      <button onClick={() => handleUpdateProduct(item.id)}>
        Update product
      </button>
      <button onClick={() => handleDeleteProduct(item.id)}>
        Delete product
      </button>
    </div>
  );
};

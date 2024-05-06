import React from "react";
import { useAddProductMutation, useGetGoodsQuery } from "./redux";
import { ProductType } from "./Types";
import { ProductList } from "./components/ProductList";

function App() {
  const [count, setCount] = React.useState<string>();
  const [newProduct, setNewProduct] = React.useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      //unwrap обеспечивает корректную работут дополнительных пропов из useAddProductMutation
      try {
        if (!isError) {
          setNewProduct("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target?.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((item: ProductType) => (
          <ProductList item={item} key={item.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;

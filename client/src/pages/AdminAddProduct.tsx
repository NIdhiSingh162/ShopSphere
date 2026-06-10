import { useState } from "react";
import axios from "axios";

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("stock", stock);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "http://10.52.129.168:5000/api/products",
        formData
      );

      alert("Product Added Successfully");

      console.log(res.data);

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setStock("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="admin-form-card">
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /> */}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          required
        />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
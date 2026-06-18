import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    const p = res.data;

    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setCategory(p.category);
    setBrand(p.brand);
    setStock(p.stock);
    setOldImage(p.image);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("stock", stock);
    formData.append("image", oldImage);

    if (newImage) {
      formData.set("image", newImage);
    }

    await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, formData);

    alert("Product Updated Successfully");
    navigate("/admin/products");
  };

  return (
    <div className="admin-form-card">
      <h1>Edit Product</h1>

      {oldImage && (
        <img
          src={`${oldImage}`}
          alt={name}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            display: "block",
            margin: "10px auto"
          }}
        />
      )}

      <form onSubmit={handleUpdate}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
        <input value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input value={stock} onChange={(e) => setStock(e.target.value)} />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewImage(e.target.files ? e.target.files[0] : null)
          }
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
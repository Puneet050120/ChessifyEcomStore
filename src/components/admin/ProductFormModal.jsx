import { useState } from "react";
import axios from "axios";

export default function ProductFormModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null); // File input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !size) {
      setError("Name, Size and price are required.");
      return;
    }

    try {
      const uploadRes = await axios.post("http://localhost:5000/api/upload/image");

      const imageUrl = uploadRes.data.url; 

      // Step 2: Save product with imageUrl
      const productData = {
        name,
        price,
        size,
        imageUrl,
      };

      await axios.post("http://localhost:5000/api/products/create", productData);

      // Reset form and close modal
      setName("");
      setPrice("");
      setSize("");
      setImage(null);
      setError("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to save product: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
              className="input"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          <input
            type="file"
            className="input"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

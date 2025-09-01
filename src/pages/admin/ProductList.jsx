import ProductTable from "../../components/admin/ProductTable";
import ProductFormModal from "../../components/admin/ProductFormModal";
import CSVUploader from "../../components/admin/CSVUploader";
import { useState } from "react";

export default function ProductList() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            + Add Product
          </button>
          <CSVUploader />
        </div>
      </div>

      <ProductTable />

      <ProductFormModal open={showForm} setOpen={setShowForm} />
    </div>
  );
}

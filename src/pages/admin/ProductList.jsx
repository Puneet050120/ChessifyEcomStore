import ProductTable from "../../components/admin/ProductTable";
import ProductFormModal from "../../components/admin/ProductFormModal";
import CSVUploader from "../../components/admin/CSVUploader";
import { useState } from "react";

export default function ProductList() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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

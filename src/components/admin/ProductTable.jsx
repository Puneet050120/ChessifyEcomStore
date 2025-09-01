const products = [
    { id: 1, name: "Oversized Tee", price: "₹799", image: "/dummy.jpg" },
    { id: 2, name: "Denim Jacket", price: "₹1,999", image: "/dummy.jpg" },
  ];
  
  export default function ProductTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <img src={item.image} alt="" className="h-12 rounded" />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
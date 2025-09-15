const products = [
    { id: 1, name: "Wireless Earbuds", price: "₹2,499", image: "/dummy.jpg" },
    { id: 2, name: "Mechanical Keyboard", price: "₹7,999", image: "/dummy.jpg" },
    { id: 3, name: "Graphic Hoodie", price: "₹1,499", image: "/dummy.jpg" },
  ];
  
  export default function ProductTable() {
    return (
      <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div className="h-12 w-12 bg-gray-700 rounded"></div>
                </td>
                <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:underline mr-4 font-medium">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline font-medium">
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
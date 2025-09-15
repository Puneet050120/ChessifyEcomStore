import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

export default function CSVUploader() {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [insertedCount, setInsertedCount] = useState(null);
  const [error, setError] = useState(null);

  const REQUIRED_FIELDS = ["name", "price", "stock", "size"];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data;
        setHeaders(Object.keys(parsed[0]));
        setCsvData(parsed);
        setInsertedCount(null);
        setError(null);
      },
    });
  };

  const handleBulkInsert = async () => {
    setLoading(true);
    setError(null);
    setInsertedCount(null);
  
    const validProducts = csvData.filter((row) =>
      REQUIRED_FIELDS.every((field) => row[field])
    );
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/admin/products/bulk-upload",
        validProducts
      );
  
      setInsertedCount(response.data.insertedCount || 0);
      
      setCsvData([]);
      setHeaders([]);
    } catch (err) {
      setError("Upload failed. Check console for details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-4">
      <label className="cursor-pointer inline-block border border-gray-700 px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFile} />
      </label>

      {csvData.length > 0 && (
        <div className="border border-gray-800 rounded-md p-4 bg-gray-900">
          <h3 className="font-semibold mb-2 text-white">CSV Preview:</h3>
          <div className="overflow-auto max-h-60 text-sm">
            <table className="w-full border border-gray-700 text-left text-gray-400">
              <thead className="bg-gray-800 text-xs uppercase">
                <tr>
                  {headers.map((head) => (
                    <th key={head} className="px-2 py-1 border-r border-gray-700">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-800">
                    {headers.map((head) => (
                      <td key={head} className="px-2 py-1 border-r border-gray-700">
                        {row[head]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleBulkInsert}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Submit All"}
          </button>

          {insertedCount !== null && (
            <p className="mt-2 text-green-500">
              ✅ {insertedCount} products inserted successfully!
            </p>
          )}

          {error && <p className="mt-2 text-red-500">❌ {error}</p>}
        </div>
      )}
    </div>
  );
}
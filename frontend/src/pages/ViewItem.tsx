import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchItems } from "../slices/itemSlice";
import ItemDetailsModal from "../components/ItemDetailsModal";
import { mockItems } from "../utils/mockData";

type Item = {
  _id: string;
  name: string;
  itemType: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
};

const ViewItems = () => {
  const dispatch = useAppDispatch();
  let { items, loading, error } = useAppSelector((state) => state.item);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  items = [...items, ...mockItems];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.coverImage}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Type:</strong> {item.itemType}
              </p>
              <p className="text-sm text-gray-700">
                {item.description.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ViewItems;

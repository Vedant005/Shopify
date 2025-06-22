// src/pages/ViewItems.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchItems } from "../slices/itemSlice";

const ViewItems = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.item);
  console.log(items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <div key={item._id} className="">
          <img src={item.coverImage} alt={item.name} />
          <h3>Name: {item.name}</h3>
          <p>Type: {item.itemType}</p>
          <p>Description: {item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewItems;

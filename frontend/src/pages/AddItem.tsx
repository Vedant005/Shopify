import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hook";
import { addItem, clearMessages } from "../slices/itemSlice";
import "react-toastify/dist/ReactToastify.css";

const AddItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { successMessage, error } = useAppSelector((state) => state.item);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null as File | null,
    additionalImages: [] as File[],
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: null,
        additionalImages: [],
      });
      (document.getElementById("addItemForm") as HTMLFormElement)?.reset();
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "coverImage") {
      setFormData((prev) => ({ ...prev, coverImage: files[0] }));
    } else if (name === "additionalImages") {
      setFormData((prev) => ({
        ...prev,
        additionalImages: Array.from(files),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    if (formData.coverImage) data.append("coverImage", formData.coverImage);
    formData.additionalImages.forEach((file) =>
      data.append("additionalImages", file)
    );

    dispatch(addItem(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <form id="addItemForm" onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Item Type"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Item Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <div>
            <label className="block font-medium mb-1">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              className="w-full"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Additional Images</label>
            <input
              type="file"
              name="additionalImages"
              accept="image/*"
              multiple
              className="w-full"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add Item
          </button>
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>
    </div>
  );
};

export default AddItem;

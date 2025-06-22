import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItem: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null as File | null,
    additionalImages: [] as File[],
  });

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
      setFormData((prev) => ({ ...prev, additionalImages: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    if (formData.coverImage) data.append("coverImage", formData.coverImage);
    formData.additionalImages.forEach((file) => {
      data.append("additionalImages", file);
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/items/create`, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        toast.success("Item successfully added!");
        setFormData({
          name: "",
          type: "",
          description: "",
          coverImage: null,
          additionalImages: [],
        });
        (document.getElementById("addItemForm") as HTMLFormElement).reset();
      } else {
        toast.error("Failed to add item.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        id="addItemForm"
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Add New Item</h2>

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
          Add Item
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default AddItem;

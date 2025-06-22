import React from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hook";
import { enquireItem, clearMessages } from "../slices/itemSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Item {
  _id: string;
  name: string;
  itemType: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

interface Props {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetailsModal: React.FC<Props> = ({ item, isOpen, onClose }) => {
  const [current, setCurrent] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const images = [item.coverImage, ...item.additionalImages];

  const dispatch = useAppDispatch();
  const { successMessage, error } = useAppSelector((state) => state.item);

  React.useEffect(() => {
    if (successMessage || error) {
      setLoading(false);
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);

  const handleEnquire = () => {
    setLoading(true);
    dispatch(enquireItem(item._id));
  };

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full z-50 overflow-hidden">
          {/* Close icon top-right */}
          <div className="absolute top-4 right-4">
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600 hover:text-black" />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative">
            <img
              src={images[current]}
              alt={`Slide ${current}`}
              className="w-full h-64 object-cover"
            />
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
              onClick={prev}
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
              onClick={next}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Details */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{item.itemType}</p>
            <p className="text-gray-700 mb-4">{item.description}</p>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
                onClick={handleEnquire}
              >
                {loading ? "Enquiring..." : "Enquire"}
              </button>

              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemDetailsModal;

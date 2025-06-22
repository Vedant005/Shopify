import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";

interface Item {
  _id: string;
  name: string;
  itemType: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const res = await api.get("/items/");
  return res.data.data;
});

export const addItem = createAsyncThunk(
  "items/addItem",
  async (formData: FormData) => {
    const res = await api.post("/items/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

export const enquireItem = createAsyncThunk(
  "items/enquireItem",
  async (itemId: string) => {
    const res = await api.post("/items/enquire", { itemId });
    return res.data;
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch items";
      })
      .addCase(addItem.fulfilled, (state) => {
        state.successMessage = "Item created successfully";
      })
      .addCase(addItem.rejected, (state) => {
        state.error = "Item creation failed";
      })
      .addCase(enquireItem.fulfilled, (state) => {
        state.successMessage = "Enquiry sent successfully";
      })
      .addCase(enquireItem.rejected, (state) => {
        state.error = "Enquiry failed";
      });
  },
});

export const { clearMessages } = itemSlice.actions;
export default itemSlice.reducer;

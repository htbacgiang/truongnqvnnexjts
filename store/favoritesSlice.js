import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Lấy cả fonts và brideGroomName từ backend
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (deviceId) => {
    const response = await fetch(`/api/favorites?deviceId=${encodeURIComponent(deviceId)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch favorites');
    return {
      fonts: data.fonts ?? [],
      brideGroomName: data.brideGroomName ?? '',
    };
  }
);

// Thêm hoặc cập nhật brideGroomName
export const updateBrideGroomName = createAsyncThunk(
  'favorites/updateBrideGroomName',
  async ({ deviceId, brideGroomName }) => {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, brideGroomName }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update brideGroomName');
    return data.brideGroomName ?? '';
  }
);

export const addFavoriteFont = createAsyncThunk(
  'favorites/addFavoriteFont',
  async ({ deviceId, font }) => {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, font }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add favorite');
    return data.fonts ?? [];
  }
);

export const removeFavoriteFont = createAsyncThunk(
  'favorites/removeFavoriteFont',
  async ({ deviceId, font }) => {
    const response = await fetch(`/api/favorites`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, font }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to remove favorite');
    return data.fonts ?? [];
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteFonts: [],
    brideGroomName: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    resetFavorites: (state) => {
      state.favoriteFonts = [];
      state.brideGroomName = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoriteFonts = action.payload.fonts;
        state.brideGroomName = action.payload.brideGroomName;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBrideGroomName.fulfilled, (state, action) => {
        state.brideGroomName = action.payload;
      })
      .addCase(updateBrideGroomName.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addFavoriteFont.fulfilled, (state, action) => {
        state.favoriteFonts = action.payload;
      })
      .addCase(addFavoriteFont.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeFavoriteFont.fulfilled, (state, action) => {
        state.favoriteFonts = action.payload;
      })
      .addCase(removeFavoriteFont.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

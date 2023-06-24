import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tables: [],
  chairs: [],
  partitions: [],
};

export const ElemSlice = createSlice({
  name: 'elems',
  initialState,
  reducers: {
    addElement: (state, action) => {
      switch (action.payload.type) {
        case 'table':
          state.tables.push(action.payload);
          break;
        case 'chair':
          state.chairs.push(action.payload);
          break;
        case 'partition':
          state.partitions.push(action.payload);
          break;

        default:
          break;
      }
    },

    setTables: (state, action) => {
      state.tables = action.payload;
    },
    setChairs: (state, action) => {
      state.chairs = action.payload;
    },
    setPartitions: (state, action) => {
      state.partitions = action.payload;
    },

    deleteElements: (state, action) => {
      state.tables = [];
      state.chairs = [];
      state.partitions = [];
    },
  },
});

export const {
  addElement,
  setTables,
  setChairs,
  setPartitions,
  deleteElements,
} = ElemSlice.actions;
export default ElemSlice.reducer;

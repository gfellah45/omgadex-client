import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UiInterface = {
  showModal: false,
  modalType: "",
  modalProps: {},
  trade: "",
  tradeProps: {},
  media: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = action.payload.showModal;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideModal: (state) => {
      state.showModal = false;
      state.modalType = "";
      state.modalProps = {};
    },
    tradeType: (
      state,
      action: PayloadAction<{ tradeType: string; tradeProps?: {} }>
    ) => {
      state.trade = action.payload.tradeType;
      state.tradeProps = action.payload.tradeProps;
    },
    media: (state) => {
      state.media = !state.media;
    },
  },
});

export const { showModal, hideModal, tradeType } = uiSlice.actions;

export default uiSlice.reducer;

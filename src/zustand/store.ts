import { create } from "zustand";
import { createThemeSlice, IThemeState } from "./themeSlice";
import { createSnackbarSlice, ISnackbarState } from "./snackbarSlice";

interface IStore extends IThemeState, ISnackbarState {}

export const useStore = create<IStore>()((...a) => ({
  ...createThemeSlice(...a),
  ...createSnackbarSlice(...a),
}));

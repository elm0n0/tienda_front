import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseAPI } from "../../services/auth/types/AuthResponse";

interface AuthState {
  user: AuthResponseAPI | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthResponseAPI>) => {
      state.user = action.payload;
      localStorage.setItem("AuthUser", JSON.stringify(action.payload));
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;

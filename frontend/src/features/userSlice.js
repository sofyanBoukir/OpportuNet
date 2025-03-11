import { createSlice } from "@reduxjs/toolkit";
const user = {
  name: "said",
  age: 18,
};
const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    user: {
      adduser: (state) => state,
    },
  },
});

export default userSlice.reducer;

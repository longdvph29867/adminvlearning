import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
}
const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {
        setLoadingOn: (state, action) => {
            state.isLoading = true;
        },
        setLoadingOff: (state, action) => {
            state.isLoading = false;
        },
    }
})

export const { setLoadingOn, setLoadingOff } = loadingSlice.actions;
export default loadingSlice.reducer;
import { localService } from "../service/localService";

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    infoUserAdmin: localService.get(),
    infoUserUpdate: {1: 21},
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setInfoUserAdmin: (state, action) => {
            state.infoUserAdmin = action.payload
        },
        setInfoUserUpdate: (state, action) => {
            state.infoUserUpdate = action.payload
        },
    }
})

export const { setListCourse, setInfoUserUpdate } = userSlice.actions;
export default userSlice.reducer
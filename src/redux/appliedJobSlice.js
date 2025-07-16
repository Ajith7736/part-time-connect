import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs : JSON.parse(localStorage.getItem("appliedjobs")) || [],
  total : Number(localStorage.getItem("totaljobs")) || 0
};



export const appliedJobSlice = createSlice({
    name : "appliedjob",
    initialState,
    reducers : {
        appliedjobadd : (state , action) => {
            let job = action.payload;
            if(!state.jobs.find(item => item._id == job._id)){
                state.jobs.push(job);
                localStorage.setItem("appliedjobs",JSON.stringify(state.jobs));
                state.total += 1;
                localStorage.setItem("totaljobs",JSON.stringify(state.total))
            }
        },
        deleteappliedjobs : (state , action) => {
            state.jobs = state.jobs.filter(item => item._id !== action.payload)
            localStorage.setItem("appliedjobs",JSON.stringify(state.jobs));
            state.total -= 1;
            localStorage.setItem("totaljobs",JSON.stringify(state.total))
        },
        clearappliedjobs : (state) => {
            state.jobs = [];
            localStorage.removeItem("appliedjobs")
            state.total = 0;
            localStorage.removeItem("totaljobs")
        }
    }

})

export const { appliedjobadd , deleteappliedjobs , clearappliedjobs } = appliedJobSlice.actions

export default appliedJobSlice.reducer
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import usersWaitingServices from '../services/usersWaitingServices'

const initialState={
    loading:false,
    errors:null,
    success:false,
}

export const createUserWaiting=createAsyncThunk('usersWaiting/createUserWaiting',async (data,thunkAPI)=>{

    const response=await usersWaitingServices.createUserWaiting(data)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const errorCode=response.error
        return thunkAPI.rejectWithValue(errorCode)
    }

    return response
})

const usersWaitingSlice=createSlice({
    name:'usersWaiting',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(createUserWaiting.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(createUserWaiting.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(createUserWaiting.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
        })
    }
    
})

export const {resetErrors}=usersWaitingSlice.actions
export default usersWaitingSlice.reducer
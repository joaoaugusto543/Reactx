import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authServices from '../services/authServices'

const initialState={
    auth: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    loading:false,
    errors:null,
    success:false,
}

export const login=createAsyncThunk('auth/login',async (data,thunkAPI)=>{

    const response=await authServices.login(data)

    if(response.authenticationError){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const errorCode=response.error
        return thunkAPI.rejectWithValue(errorCode)
    }

    localStorage.setItem('token',response.token)
    localStorage.setItem('user',JSON.stringify(response.user))
    
    return response
})

export const logout=createAsyncThunk('auth/logout',async (data,thunkAPI)=>{

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
})

const authSlices=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        },
        resetAuth:function(state){
            state.auth=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(login.fulfilled,(state,action)=>{
            state.auth=action.payload.token
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(login.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
            state.auth=null
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.auth=null
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(logout.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(logout.rejected,(state,action)=>{
            state.errors=null
            state.success=false
            state.loading=false
            state.auth=null
        })
    }
    
})

export const {resetErrors}=authSlices.actions
export default authSlices.reducer
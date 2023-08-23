import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import creditServices from '../services/creditServices'
import api from '../api/api'

const initialState={
    loading:false,
    errors:null,
    success:false,
}

export const askingForCredit=createAsyncThunk('credit/askingForCredit',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await creditServices.askingForCredit(data)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){


        if(response.error === 'Token was not provided' || response.error === 'Invalid token' || response.error==='User not found' || response.error==='User has been banned'){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }

        const errorCode=response.error
        return thunkAPI.rejectWithValue(errorCode)
    }
    
    return response
})

const creditSlices=createSlice({
    name:'credit',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        },
        resetSuccess:function(state){
            state.success=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(askingForCredit.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(askingForCredit.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(askingForCredit.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
        })
    }
    
})

export const {resetErrors,resetSuccess}=creditSlices.actions
export default creditSlices.reducer
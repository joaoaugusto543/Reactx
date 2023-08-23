import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import userServices from '../services/userServices'
import api from '../api/api'

const initialState={
    user: null,
    loading:false,
    errors:null,
    success:false,
    successMessage:null
}

export const profile=createAsyncThunk('user/profile',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await userServices.profile()

    if(response.error){
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

export const update=createAsyncThunk('user/update',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await userServices.update(data)

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

const userSlices=createSlice({
    name:'user',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        },
        resetUser:function(state){
            state.user=null
        },
        resetSuccessMessage:function(state){
            state.successMessage=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(profile.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.errors=null
            state.success=true
            state.successMessage=null
        })
        .addCase(profile.pending,(state)=>{
            state.loading=true
            state.errors=null
            state.successMessage=null
        })
        .addCase(profile.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
            state.user=null
            state.successMessage=null
        })
        .addCase(update.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.errors=null
            state.success=true
            state.successMessage='Conta atualizada'
        })
        .addCase(update.pending,(state)=>{
            state.loading=true
            state.errors=null
            state.successMessage=null
        })
        .addCase(update.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
            state.successMessage=null
        })
    }
    
})

export const {resetErrors,resetUser,resetSuccessMessage}=userSlices.actions
export default userSlices.reducer
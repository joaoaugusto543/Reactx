import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import accountServices from '../services/accountServices'
import api from '../api/api'
import transformerExtrato from '../functions/transformerExtrato'

const initialState={
    account: null,
    loading:false,
    errors:null,
    success:false,
}

export const getAccount=createAsyncThunk('account/getAccount',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await accountServices.getAccount()

    response.extrato=transformerExtrato(response.extrato).reverse()

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

export const transition=createAsyncThunk('account/transition',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await accountServices.transition(data)

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

export const clearExtract=createAsyncThunk('account/clearExtract',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await accountServices.clearExtract()

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

export const checkDebt=createAsyncThunk('account/checkDebt',async (data,thunkAPI)=>{

    const token=localStorage.getItem('token')
    
    api.defaults.headers.authorization=`Bearer ${token}`

    const response=await accountServices.checkDebt()

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){

        if(response.error === 'Token was not provided' || response.error === 'Invalid token' || response.error==='Account not found' || response.error==='User has been banned'){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }

        const errorCode=response.error
        return thunkAPI.rejectWithValue(errorCode)
    }

    if(!response.debt){
        return thunkAPI.rejectWithValue('debt null')
    }

    return response
})

const accountSlices=createSlice({
    name:'account',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        },
        resetAccount:function(state){
            state.account=null
        },
        resetSuccess:function(state){
            state.success=false
        }
    },
    extraReducers:function(build){
        build
        .addCase(getAccount.fulfilled,(state,action)=>{
            state.account=action.payload
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(getAccount.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(getAccount.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
            state.account=null
        })
        .addCase(transition.fulfilled,(state,action)=>{
            state.account=action.payload.accountUpdated
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(transition.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(transition.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
            state.account=null
        })
        .addCase(clearExtract.fulfilled,(state,action)=>{
            state.account.extrato=[]
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(clearExtract.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(clearExtract.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
        })
        .addCase(checkDebt.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(checkDebt.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(checkDebt.rejected,(state,action)=>{
            state.errors=action.payload
            state.success=false
            state.loading=false
        })
    }
    
})

export const {resetErrors,resetAccount,resetSuccess}=accountSlices.actions
export default accountSlices.reducer
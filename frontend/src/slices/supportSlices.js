import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import supportServices from '../services/supportServices'

const initialState={
    loading:false,
    messageSuccess:null,
    messageError:null,
}

export const support=createAsyncThunk('support/support',async (data,thunkAPI)=>{

    const response=await supportServices.support(data)

    if(response.error){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    return response
})

const supportSlices=createSlice({
    name:'support',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        },
        resetMessageSuccess:function(state){
            state.messageSuccess=null
        },
        resetMessageError:function(state){
            state.messageError=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(support.fulfilled,(state,action)=>{
            state.loading=false
            state.messageError=null
            state.messageSuccess='Enviado com sucesso'
        })
        .addCase(support.pending,(state)=>{
            state.loading=false
            state.messageError=null
            state.messageSuccess=null
        })
        .addCase(support.rejected,(state,action)=>{
            state.loading=false
            state.messageError='Falha no envio'
            state.messageSuccess=null
        })
    }
    
})

export const {resetErrors,resetMessageError,resetMessageSuccess}=supportSlices.actions
export default supportSlices.reducer
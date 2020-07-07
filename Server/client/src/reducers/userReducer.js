export const initialState = null
export const reducer = (state,action)=>{
    if(action.type=="USER")
    {
    return action.payload
    }
    if(action.type=="Clear")
    {
        return null
    }
    if(action.type=="UPDATE"){
        return{
            ...state,// this is how we append in state
            followers:action.payload.followers,
            following:action.payload.following
        }
    }
    if(action.type=="UPDATEPIC"){
        return{
            ...state,// this is how we append in state
            pic:action.payload
        }
    }
    return state
}

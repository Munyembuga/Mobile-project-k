const initialState ={
    authToken: null,
    authLoaded:false,
    authProfile:null,
    authToken:"",
    authRole:null,
}
export default (state=initialState, action)=>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                authToken: action.payload,
            }
    }
}
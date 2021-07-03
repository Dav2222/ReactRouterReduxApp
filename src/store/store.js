import { createStore } from "redux";
import {ADD_FAVORITE, REMOVE_FAVORITE, RESET_FAVORITE} from "./actions"

const initialState = {
    favoritsList : []
};

const favoritsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case ADD_FAVORITE:{         
            return {...state, favoritsList:state.favoritsList.concat(payload.post)}
        } 

        case REMOVE_FAVORITE:{
            return {...state, favoritsList:state.favoritsList.filter((post) => post.key !== payload.postId)}
        } 

        case RESET_FAVORITE:{
            return {...state, favoritsList: []}
        } 

        default: return state;
    }
}


export default createStore(favoritsReducer)
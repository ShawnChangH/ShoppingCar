import initstate from '../store/box'

//第一步modle製作
export default {
    //state初始值，這邊是"initstate"
    state: initstate,
    reducers: {
        
        // handle state changes with pure functions
        setLoveList(state, payload) {
            //回傳state裡所有的值，只有loveLest換成payload
            return {...state,loveList:payload}
        },
        setShoppingList(state, payload) {
            return { ...state,shoppingList:payload}
        }
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
      
    }),
};
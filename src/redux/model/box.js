import initstate from '../store/box'

//�Ĥ@�Bmodle�s�@
export default {
    //state��l�ȡA�o��O"initstate"
    state: initstate,
    reducers: {
        
        // handle state changes with pure functions
        setLoveList(state, payload) {
            //�^��state�̩Ҧ����ȡA�u��loveLest����payload
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
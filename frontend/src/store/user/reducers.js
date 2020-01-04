import { actionTypes, initUserObject, initErrorMsgObject } from './types'

export function userStateReducer(state = initUserObject, action) {
    switch (action.type) {

        case actionTypes.SETINIUSERDATA:
            {
                return {...action.payload };
                break;
            }
        case actionTypes.EDITOCCUPATION:
            {
                let occupation = state.occupation;
                return {...state, occupation: action.payload };
                break;
            }
        case actionTypes.EDITUSERNAME:
            {
                let userName = state.userName;
                return {...state, userName: action.payload };
                break;
            }
        case actionTypes.EDITPASSWORD:
            {
                let password = state.password;
                return {...state, password: action.payload };
                break;
            }
        case actionTypes.ADDEXPENSE:
            {
                let expenses = state.expenses;
                return {...state, expenses: action.payload };
                break;
            }
        case actionTypes.ADDEXPENSECAT:
            {
                let expenseCatagories = state.expenseCatagories;
                return {...state, expenseCatagories: action.payload };
                break;
            }
        case actionTypes.DELETEEXPENSECAT:
            {
                let expenseCatagories = state.expenseCatagories;
                return {...state, expenseCatagories: action.payload.expenseCatagories , expenses: action.payload.expenses };
                break;
            }
        case actionTypes.EDITBUDGET:
            {
                let budget = state.budget;
                return {...state, budget: action.payload };
                break;
            }
        case actionTypes.EDITEXPENSE:
            {
                let expenses = state.expenses;
                return {...state, expenses: action.payload };
                break;
            }    
        default:
            {
                return {...state };
            }
    }
};

export function errorMsgReducer(state = initErrorMsgObject, action){
    if(action.type == actionTypes.SETERRORMSG){
        return {...state, errorMsg:action.payload};
    }else{
        return{...state};
    }
}
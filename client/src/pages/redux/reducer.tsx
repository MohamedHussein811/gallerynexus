// reducer.ts
import { LOGOUT_USER } from './actionTypes';

export interface AppState {
  isLoggedIn: boolean;
}

const initialState: AppState = {
  isLoggedIn: false,
};

const reducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;

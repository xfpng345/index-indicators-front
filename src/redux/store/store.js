import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
// reducers
import { UsersReducer } from '../users/reducers';
import { UiStateReducer } from '../uiState/reducers';

export default function createStore(history) {
    const logger = createLogger({
        collapsed: true,
        diff: true,
    });

    const middleWare = [routerMiddleware(history), thunk];
    if (process.env.NODE_ENV !== 'production') {
        middleWare.push(logger);
    }

    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            uiState: UiStateReducer,
        }),
        applyMiddleware(...middleWare)
    );
}

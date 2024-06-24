import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice';
import themeReducer from './Slice/themeSlice';
import courseReducer from './Slice/courseSlice';
import cartReducer from './Slice/cartSlice';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer,
    course:courseReducer,
    cart:cartReducer
})
const persistConfig = {
    key:"root",
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store);
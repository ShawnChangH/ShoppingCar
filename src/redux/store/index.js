import { init } from "@rematch/core";
import * as models from "../model";
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistPlugin from "@rematch/persist";


const persistConfig = {
    key: "root",
    whitelist:['box'],
    storage: AsyncStorage,
};

const store = init({
    models,
    plugins: [persistPlugin(persistConfig)],
})


export default store




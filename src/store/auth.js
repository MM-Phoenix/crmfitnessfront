import { createStore } from "vuex";
import { auth } from "./AuthModule";

const store = createStore({
    modules: {
        auth,
    },
});

export default store;
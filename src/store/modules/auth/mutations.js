export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
    setLogout(state) {
        state.token = null;
        state.userId = null;
        state.didAutoLogout = false;
    }
};
export default{
    addRequest(state, payload){
        state.requests.push(payload);
    },
    setRequests(state, payload){
        state.requests = payload;
    },
    setFetchTimestamp(state){
        state.lastFetch = new Date().getTime();
    },
    removeRequest(state, payload){
        state.requests = state.requests.filter(request => request.id !== payload);
    }
}
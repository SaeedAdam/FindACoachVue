export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-http-demo-7a2bd-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        console.log(response);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    acceptRequest(context, payload) {
        context.commit('addCoachToTeam', payload);
    },
    declineRequest(context, payload) {
        context.commit('removeRequest', payload);
    },
    async loadRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-7a2bd-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();
        
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
};
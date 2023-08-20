<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
        <header>
            <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
        <ul v-else-if="hasRequests">
            <request-item v-for="request in requests" 
            :key="request.id" 
            :id="request.id"
            :coach-id="request.coachId"
            :email="request.userEmail"
            :message="request.message"
             />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
    </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
    name: 'RequestsReceived',
    components: {
        RequestItem
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    computed: {
        requests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.requests && this.requests.length > 0;
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/loadRequests');
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    created() {
        this.loadRequests();
    },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
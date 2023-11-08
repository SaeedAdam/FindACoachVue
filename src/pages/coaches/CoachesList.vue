<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="control">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                <base-button v-if="!isCoach && !isLoading && isLoggedIn" link to="/register">Register as Coach</base-button>
                <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName"
                    :last-name="coach.lastName" :areas="coach.areas" :description="coach.description" :rate="coach.rate">
                </CoachItem>
            </ul>
            <h3 v-else>No coaches found. Please register as a coach.</h3>
        </base-card>
    </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const activeFilters = ref({
    frontend: true,
    backend: true,
    career: true
});
const isLoading = ref(false);
const error = ref(null);

const store = useStore();

const filteredCoaches = computed(() => {
    const coaches = store.getters['coaches/coaches'];
    const filteredCoaches = coaches.filter(coach => {
        if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
            return true;
        }
        if (activeFilters.value.backend && coach.areas.includes('backend')) {
            return true;
        }
        if (activeFilters.value.career && coach.areas.includes('career')) {
            return true;
        }
        return false;
    });
    return filteredCoaches;
});

const hasCoaches = computed(() => !isLoading.value && store.getters['coaches/hasCoaches']);

const isCoach = computed(() => store.getters['coaches/isCoach']);

const isLoggedIn = computed(() => store.getters['isAuthenticated']);

const setFilters = updatedFilters => {
    activeFilters.value = updatedFilters;
};

const loadCoaches = async (refresh = false) => {
    isLoading.value = true;
    try {
        await store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
    } catch (error) {
        error.value = error.message || 'Something went wrong!';
    }
    isLoading.value = false;
};

const handleError = () => {
    error.value = null;
};

loadCoaches();
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
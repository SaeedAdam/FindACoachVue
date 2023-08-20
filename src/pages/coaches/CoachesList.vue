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

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: { CoachItem, CoachFilter },
    name: 'CoachesList',
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null
        }
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            const filteredCoaches = coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
            return filteredCoaches;
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated'];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null
        }
    },
    created() {
        this.loadCoaches();
    }
}
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
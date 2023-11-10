<template>
    <div>
        <section>
            <base-card>
                <div v-if="selectedCoach">
                    <h2>{{ fullName }}</h2>
                    <h3>${{ rate }}/hour</h3>
                </div>
                <div v-else>
                    <base-spinner></base-spinner>
                </div>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button link :to="contactLink">Contact</base-button>
                </header>
                <router-view />
            </base-card>
        </section>
        <section>
            <base-card>
                <div v-if="selectedCoach">
                    <base-badge v-for="area in areas" :key="area" :title="area" :type="area">
                    </base-badge>
                    <p>{{ description }}</p>
                </div>
                <div v-else>
                    <base-spinner></base-spinner>
                </div>
            </base-card>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const store = useStore();
const router = useRoute();

const selectedCoach = ref('');

const loadCoach = async (refresh = false) => {
    const coachId = props.id;
    const coaches = store.getters['coaches/coaches'];
    let coach = coaches.find(coach => coach.id === coachId);
    if (!coach) {
        await store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
        coach = store.getters['coaches/coaches'].find(coach => coach.id === coachId);
    }
    selectedCoach.value = coach;
};

onBeforeMount(() => {
    loadCoach();
});

const fullName = computed(() => selectedCoach.value ? `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}` : '');

const areas = computed(() => selectedCoach.value ? selectedCoach.value.areas : '');

const description = computed(() => selectedCoach.value ? selectedCoach.value.description : '');

const rate = computed(() => selectedCoach.value ? selectedCoach.value.rate : '');

const contactLink = computed(() => {
    const currentRoute = router.path;

    // Check if the current path already contains "/contact"
    if (currentRoute.includes('/contact')) {
        return currentRoute;
    } else {
        return `${currentRoute}/contact`;
    }
});

</script>


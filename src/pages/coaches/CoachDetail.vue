<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}/hour</h3>
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
                <base-badge v-for="area in areas" :key="area" :title="area" :type="area">
                </base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const id = route.params.id;
const selcetedCoach = ref(null);

selcetedCoach.value = store.getters['coaches/coaches'].find(
    coach => coach.id === id
);

const fullName = computed(() => `${selcetedCoach.value.firstName} ${selcetedCoach.value.lastName}`);

const areas = computed(() => selcetedCoach.value.areas);

const description = computed(() => selcetedCoach.value.description);

const rate = computed(() => selcetedCoach.value.rate);

const contactLink = computed(() => `${route.path}/contact`);

</script>
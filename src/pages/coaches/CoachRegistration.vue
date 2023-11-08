<template>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <coach-form @save-form="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CoachForm from '../../components/coaches/CoachForm.vue';

const store = useStore();
const router = useRouter();

const saveData = formData => {
    store.dispatch('coaches/registerCoach', formData);
    router.replace('/coaches');
};
</script>

<style scoped></style>
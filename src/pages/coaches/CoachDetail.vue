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

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            selcetedCoach: null
        }
    },
    computed: {
        fullName() {
            return `${this.selcetedCoach.firstName} ${this.selcetedCoach.lastName}`
        },
        areas() {
            return this.selcetedCoach.areas
        },
        description() {
            return this.selcetedCoach.description
        },
        rate() {
            return this.selcetedCoach.rate
        },
        contactLink() {
            return `${this.$route.path}/contact`
        }
    },
    created() {
        this.selcetedCoach = this.$store.getters['coaches/coaches'].find(
            coach => coach.id === this.id
        );
    },
}
</script>
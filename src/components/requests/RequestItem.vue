<template>
    <li>
       <div>
        <a :href="emailLink">{{ email }}</a>
       </div>
       <p>{{ message }}</p>
    </li>
</template>

<script>
export default{
    name: 'RequestItem',
    props: {
        id: {
            type: String,
            required: false
        },
        coachId: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    computed: {
        coachLink() {
            return `/coaches/${this.coachId}`;
        },
        emailLink() {
            return `mailto:${this.email}`;
        }
    },
    methods: {
        acceptRequest() {
            this.$store.dispatch('requests/acceptRequest', {
                requestId: this.id
            });
        },
        declineRequest() {
            this.$store.dispatch('requests/declineRequest', {
                requestId: this.id
            });
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
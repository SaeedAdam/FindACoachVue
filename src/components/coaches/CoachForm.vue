<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstname.isValid }">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstname.value" @blur="clearValidity('firstname')" />
            <p v-if="!firstname.isValid">Please enter a valid firstname.</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastname.isValid }">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastname.value" @blur="clearValidity('lastname')" />
            <p v-if="!lastname.isValid">Please enter a valid lastname.</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.value" @blur="clearValidity('description')">
            </textarea>
            <p v-if="!description.isValid">Please enter a valid description.</p>
        </div>
        <div class="form-control" :class="{ invalid: !rate.isValid }">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" step="0.1" v-model.number="rate.value" @blur="clearValidity('rate')" />
            <p v-if="!rate.isValid">rate must be greater than 0.</p>
        </div>
        <div class="form-control" :class="{ invalid: !areas.isValid }">
            <h3 for="areas">Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.value"
                    @blur="clearValidity('areas')" />
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="clearValidity('areas')" />
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearValidity('areas')" />
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">Please select at least one area.</p>
        </div>
        <div class="actions">
            <p v-if="!formIsValid">Please fix the above errors to submit the form.</p>
            <base-button mode="outline" to="/">Cancel</base-button>
            <base-button type="submit">Submit</base-button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'CoachForm',
    emits: ['save-form'],
    data() {
        return {
            firstname: {
                value: '',
                isValid: true
            },
            lastname: {
                value: '',
                isValid: true
            },
            description: {
                value: '',
                isValid: true
            },
            areas: {
                value: [],
                isValid: true
            },
            rate: {
                value: '',
                isValid: true
            },
            formIsValid: true
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.firstname.value === '') {
                this.firstname.isValid = false;
                this.formIsValid = false;
            }
            if (this.lastname.value === '') {
                this.lastname.isValid = false;
                this.formIsValid = false;
            }
            if (this.description.value === '') {
                this.description.isValid = false;
                this.formIsValid = false;
            }
            if (this.areas.value.length === 0) {
                this.areas.isValid = false;
                this.formIsValid = false;
            }
            if (!this.rate.value || this.rate.value <= 0) {
                this.rate.isValid = false;
                this.formIsValid = false;
            }
        },
        submitForm() {
            this.validateForm();
            if (!this.formIsValid) {
                console.log('Invalid form');
                return;
            }

            const formData = {
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                description: this.description.value,
                areas: this.areas.value,
                rate: this.rate.value
            };

            this.$emit('save-form', formData);
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>
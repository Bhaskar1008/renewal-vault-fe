<template>
<v-app>
    <div class="card-padding">
    <v-card>
        <div class="form-padding">
  <form>
      <div>
    <v-text-field
      label="Name"
      class="text-padding"
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      required
    ></v-text-field>
    <v-select
   
      label="Item"
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
      required
    ></v-select>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :error-messages="checkboxErrors"
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
      required
    ></v-checkbox>
      </div>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
    
  </form>
        </div>
    </v-card>
    </div>
</v-app>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: { required }
    },

    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Apple',
        'Mango',
        'Banana',
        'Graps'
      ],
      checkbox: false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.required && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>
<style>
.form-padding{
    padding:30px;
}
.card-padding{
    padding:60px;
    padding-top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

}
.text-padding{
    padding-bottom:0px;

}
</style>

<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-md-6 mb-2">
        <input v-model="f.name" class="form-control" placeholder="Nombre" required />
      </div>
      <div class="col-md-6 mb-2">
        <input v-model="f.email" type="email" class="form-control" placeholder="Correo" required />
      </div>
      <div class="col-md-6 mb-2">
        <input v-model="f.phone" class="form-control" placeholder="Teléfono" required />
      </div>
      <div class="col-md-6 mb-2">
        <input v-model="f.address" class="form-control" placeholder="Dirección" required />
      </div>
      <div class="col-md-6 mb-2">
        <input v-model="f.city" class="form-control" placeholder="Ciudad" required />
      </div>
      <div class="col-md-6 mb-2">
        <input v-model="f.country" class="form-control" placeholder="País" required />
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">
        {{ f.id ? 'Actualizar' : 'Agregar' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    contact: Object
  },
  data() {
    return {
      f: this.contact
        ? { ...this.contact }
        : { id: null, name: '', email: '', phone: '', address: '', city: '', country: '' }
    }
  },
  watch: {
    contact(n) {
      this.f = n
        ? { ...n }
        : { id: null, name: '', email: '', phone: '', address: '', city: '', country: '' }
    }
  },
  methods: {
    submit() {
      this.$emit('save', { ...this.f })
    }
  }
}
</script>

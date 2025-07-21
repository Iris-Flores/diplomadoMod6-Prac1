<template>
  <div>
    <input
      v-model="search"
      @input="$emit('filter', search)"
      class="form-control mb-3"
      placeholder="Buscar por nombre o correo"
    />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Country</th>
          <th>City</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in contacts" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.name }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.address }}</td>
          <td>{{ c.phone }}</td>
          <td>{{ c.country }}</td>
          <td>{{ c.city }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="$emit('delete', c.id)"> Eliminar </button>
            <button class="btn btn-warning btn-sm me-1" @click="$emit('edit', c)"> Editar </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { search: '' }
  }
}
</script>

<template>
  <div class="container my-4">
    <h1>Práctica 1</h1>
    <h2 class="mb-4">Agenda de Contactos</h2>

    <button class="btn btn-success mb-3" @click="openModal(null)"> Agregar Contacto </button>
    <div v-if="filteredContacts.length">
      <ContactList
        :contacts="filteredContacts"
        @edit="openModal"
        @delete="deleteContact"
        @filter="filterContacts"
      />
    </div>
    <div v-else class="alert alert-info"> No hay contactos para mostrar </div>

    <div class="modal fade" id="contactModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ selected ? 'Editar Contacto' : 'Nuevo Contacto' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <ContactForm :contact="selected" @save="handleSave" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue'
import ContactForm from './components/ContactForm.vue'
import defaultContacts from './assets/contacts.json'
import { getContacts, saveContacts } from './store.js'
import * as bootstrap from 'bootstrap'

export default {
  components: { ContactList, ContactForm },
  data() {
    return {
      contacts: [],
      selected: null,
      modal: null,
      search: ''
    }
  },
  computed: {
    filteredContacts() {
      const term = this.search.trim().toLowerCase()
      if (!term) return this.contacts
      return this.contacts.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
      )
    }
  },
  methods: {
    openModal(contact) {
      this.selected = contact ? { ...contact } : null
      this.modal = new bootstrap.Modal(document.getElementById('contactModal'))
      this.modal.show()
    },
    handleSave(contact) {
      if (contact.id) {
        const idx = this.contacts.findIndex(c => c.id === contact.id)
        this.contacts.splice(idx, 1, contact)
      } else {
        // Nuevo: asignar un nuevo ID incremental
        const maxId = this.contacts.reduce((max, c) => c.id > max ? c.id : max, 0)
        contact.id = maxId + 1
        this.contacts.push(contact)
      }
      saveContacts(this.contacts)
      this.modal.hide()
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter(c => c.id !== id)
      saveContacts(this.contacts)
    },
    filterContacts(term) {
      this.search = term
    }
  },
  mounted() {
    const stored = getContacts()
    if (stored.length) {
      this.contacts = stored
    } else {
      this.contacts = defaultContacts
      saveContacts(defaultContacts)
    }
  }
}
</script>

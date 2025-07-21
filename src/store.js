export function getContacts() {
  const data = localStorage.getItem('contacts')
  return data ? JSON.parse(data) : []
}

export function saveContacts(list) {
  localStorage.setItem('contacts', JSON.stringify(list))
}

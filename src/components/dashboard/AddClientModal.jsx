import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import Modal from '../ui/Modal.jsx'

const initialFormState = {
  name: '',
  contactPhone: '',
  siteLocation: '',
}

export default function AddClientModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState(initialFormState)

  function resetForm() {
    setForm(initialFormState)
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onCreate?.({
      name: form.name.trim(),
      contactPhone: form.contactPhone.trim(),
      siteLocation: form.siteLocation.trim(),
    })
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add client"
      description="Register a new client with contact details and pump site location."
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" className="sm:w-auto" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-client-form" className="sm:w-auto">
            Add client
          </Button>
        </>
      }
    >
      <form id="add-client-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="client-name"
          label="Client name"
          name="name"
          placeholder="Northstar Fuels"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />
        <Input
          id="client-phone"
          label="Contact phone"
          name="contactPhone"
          type="tel"
          placeholder="+92 300 1234567"
          value={form.contactPhone}
          onChange={(event) => updateField('contactPhone', event.target.value)}
          required
        />
        <Input
          id="client-site-location"
          label="Site location"
          name="siteLocation"
          placeholder="Lahore, Highway 12"
          value={form.siteLocation}
          onChange={(event) => updateField('siteLocation', event.target.value)}
          required
        />
      </form>
    </Modal>
  )
}

import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import Modal from '../ui/Modal.jsx'
import Select from '../ui/Select.jsx'

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Production', label: 'Production' },
  { value: 'Importer', label: 'Importer' },
]

const initialFormState = {
  name: '',
  email: '',
  role: '',
}

export default function AddUserModal({ isOpen, onClose, onCreate }) {
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
      email: form.email.trim(),
      role: form.role,
    })
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add user"
      description="Create an internal account for Admin, Production, or Importer access."
      size="md"
      footer={
        <>
          <Button type="button" variant="secondary" className="sm:w-auto" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-user-form" className="sm:w-auto">
            Add user
          </Button>
        </>
      }
    >
      <form id="add-user-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="user-name"
          label="Name"
          name="name"
          placeholder="Ahmed Khan"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />
        <Input
          id="user-email"
          label="Email"
          name="email"
          type="email"
          placeholder="ahmed@organization.com"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />
        <Select
          id="user-role"
          label="Role"
          name="role"
          placeholder="Select role"
          options={roleOptions}
          value={form.role}
          onChange={(event) => updateField('role', event.target.value)}
          required
        />
      </form>
    </Modal>
  )
}

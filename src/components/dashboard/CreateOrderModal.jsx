import { useEffect, useState } from 'react'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'
import { mockClients } from '../../data/mockAdmin.js'
import { DEFAULT_SUBSTAGE, getStagesTotal, getSubstageIndex } from '../../data/orderStages.js'
import SubstageSelect from './SubstageSelect.jsx'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import Modal from '../ui/Modal.jsx'
import Select from '../ui/Select.jsx'

const fulfillmentOptions = [
  { value: 'On-site installation', label: 'On-site installation' },
  { value: 'Equipment delivery', label: 'Equipment delivery' },
  { value: 'Site survey & planning', label: 'Site survey & planning' },
  { value: 'Turnkey handover', label: 'Turnkey handover' },
]

const budgetTypeOptions = [
  { value: 'Procurement', label: 'Procurement' },
  { value: 'Client-funded', label: 'Client-funded' },
]

const productionLeadOptions = [
  { value: 'Ahmed K.', label: 'Ahmed K.' },
  { value: 'Fatima S.', label: 'Fatima S.' },
]

const importerOptions = [
  { value: 'Sara M.', label: 'Sara M.' },
  { value: 'Hassan R.', label: 'Hassan R.' },
]

const emptyItem = { name: '', quantity: '1', totalCost: '' }

const initialFormState = {
  name: '',
  client: '',
  location: '',
  scheduledTime: '',
  currentStage: DEFAULT_SUBSTAGE,
  fulfillmentMode: '',
  productionUser: '',
  importerUser: '',
  budgetType: '',
  items: [{ ...emptyItem }],
}

function formatOrderTime(date = new Date()) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatScheduledTime(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function parseScheduledTimeToInput(displayValue) {
  if (!displayValue) return ''

  const withYear = `${displayValue.replace(' at ', ' ')} ${new Date().getFullYear()}`
  const date = new Date(withYear)
  if (Number.isNaN(date.getTime())) return ''

  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function orderToFormState(order) {
  if (!order) return initialFormState

  return {
    name: order.name,
    client: order.client,
    location: order.location,
    scheduledTime: parseScheduledTimeToInput(order.scheduledTime),
    currentStage: order.currentStage,
    fulfillmentMode: order.fulfillmentMode,
    productionUser: order.productionUser,
    importerUser: order.importerUser,
    budgetType: order.budgetType,
    items: order.items?.length
      ? order.items.map((item) => ({
          name: item.name,
          quantity: String(item.quantity),
          totalCost: String(item.totalCost),
        }))
      : [{ ...emptyItem }],
  }
}

export default function CreateOrderModal({ isOpen, onClose, onCreate, onSave, order = null }) {
  const [form, setForm] = useState(initialFormState)
  const isEditMode = Boolean(order)

  useEffect(() => {
    if (isOpen) {
      setForm(orderToFormState(order))
    }
  }, [isOpen, order])

  function handleClose() {
    onClose()
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function updateItem(index, field, value) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  function addItem() {
    setForm((current) => ({
      ...current,
      items: [...current.items, { ...emptyItem }],
    }))
  }

  function removeItem(index) {
    setForm((current) => ({
      ...current,
      items: current.items.length > 1 ? current.items.filter((_, itemIndex) => itemIndex !== index) : current.items,
    }))
  }

  function handleClientChange(event) {
    const clientName = event.target.value
    const client = mockClients.find((entry) => entry.name === clientName)

    setForm((current) => ({
      ...current,
      client: clientName,
      location: client?.siteLocation ?? current.location,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const items = form.items
      .filter((item) => item.name.trim())
      .map((item, index) => ({
        id: index + 1,
        name: item.name.trim(),
        quantity: Number(item.quantity) || 1,
        totalCost: Number(item.totalCost) || 0,
      }))

    const orderFields = {
      name: form.name.trim(),
      client: form.client,
      location: form.location.trim(),
      productionUser: form.productionUser,
      importerUser: form.importerUser,
      currentStage: form.currentStage,
      scheduledTime: formatScheduledTime(form.scheduledTime),
      fulfillmentMode: form.fulfillmentMode,
      budgetType: form.budgetType,
      items,
    }

    if (isEditMode) {
      const stageIndex = getSubstageIndex(form.currentStage)
      onSave?.({
        ...order,
        ...orderFields,
        stagesComplete: stageIndex >= 0 ? stageIndex : order.stagesComplete,
      })
    } else {
      onCreate?.({
        ...orderFields,
        status: 'Not Started',
        stagesComplete: 0,
        stagesTotal: getStagesTotal(),
        importSpend: 0,
        lastProductionUpdate: '—',
        lastImportUpdate: '—',
        orderTime: formatOrderTime(),
      })
    }

    handleClose()
  }

  const formId = isEditMode ? 'edit-order-form' : 'create-order-form'

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit order' : 'Create order'}
      description={
        isEditMode
          ? `Update order #${order.orderNumber} — ${order.name}`
          : 'Link a customer site with production and importer teams. New orders start in the Initialized tab.'
      }
      size="xl"
      footer={
        <>
          <Button type="button" variant="secondary" className="sm:w-auto" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form={formId} className="sm:w-auto">
            {isEditMode ? 'Save changes' : 'Create order'}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-6">
        <section>
          <h3 className="m-0 text-sm font-semibold text-fg">Order details</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="order-name"
              label="Order name"
              name="name"
              placeholder="Site A — Highway 12 Pump"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
              className="sm:col-span-2"
            />
            <Select
              id="order-client"
              label="Customer"
              name="client"
              placeholder="Select customer"
              options={mockClients.map((client) => ({
                value: client.name,
                label: client.name,
              }))}
              value={form.client}
              onChange={handleClientChange}
              required
            />
            <Input
              id="order-location"
              label="Site location"
              name="location"
              placeholder="Lahore, Highway 12"
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              required
            />
          </div>
        </section>

        <section>
          <h3 className="m-0 text-sm font-semibold text-fg">Schedule & stage</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="order-scheduled-time"
              label="Scheduled date"
              name="scheduledTime"
              type="datetime-local"
              value={form.scheduledTime}
              onChange={(event) => updateField('scheduledTime', event.target.value)}
              required
            />
            {isEditMode ? (
              <SubstageSelect
                id="order-current-stage"
                label="Current substage"
                name="currentStage"
                value={form.currentStage}
                onChange={(event) => updateField('currentStage', event.target.value)}
                required
              />
            ) : (
              <Input
                id="order-current-stage"
                label="Current substage"
                name="currentStage"
                value={form.currentStage}
                readOnly
                className="[&_input]:bg-canvas [&_input]:text-fg-muted"
              />
            )}
          </div>
        </section>

        <section>
          <h3 className="m-0 text-sm font-semibold text-fg">Assignment & budget</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              id="order-fulfillment"
              label="Fulfillment"
              name="fulfillmentMode"
              placeholder="Select fulfillment mode"
              options={fulfillmentOptions}
              value={form.fulfillmentMode}
              onChange={(event) => updateField('fulfillmentMode', event.target.value)}
              required
            />
            <Select
              id="order-production"
              label="Production lead"
              name="productionUser"
              placeholder="Assign production lead"
              options={productionLeadOptions}
              value={form.productionUser}
              onChange={(event) => updateField('productionUser', event.target.value)}
              required
            />
            <Select
              id="order-budget"
              label="Budget type"
              name="budgetType"
              placeholder="Select budget type"
              options={budgetTypeOptions}
              value={form.budgetType}
              onChange={(event) => updateField('budgetType', event.target.value)}
              required
            />
            <Select
              id="order-importer"
              label="Importer"
              name="importerUser"
              placeholder="Assign importer"
              options={importerOptions}
              value={form.importerUser}
              onChange={(event) => updateField('importerUser', event.target.value)}
              required
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h3 className="m-0 text-sm font-semibold text-fg">Scope items</h3>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-brand-border hover:text-brand-text"
            >
              <RiAddLine size={14} aria-hidden="true" />
              Add item
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-canvas/60 p-3 sm:grid-cols-[1fr_100px_120px_auto]"
              >
                <Input
                  id={`order-item-name-${index}`}
                  label={index === 0 ? 'Item name' : `Item name ${index + 1}`}
                  name={`item-name-${index}`}
                  placeholder="Submersible Pump Unit"
                  value={item.name}
                  onChange={(event) => updateItem(index, 'name', event.target.value)}
                  className="min-w-0"
                />
                <Input
                  id={`order-item-quantity-${index}`}
                  label="Qty"
                  name={`item-quantity-${index}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => updateItem(index, 'quantity', event.target.value)}
                />
                <Input
                  id={`order-item-cost-${index}`}
                  label="Total cost"
                  name={`item-total-cost-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="8400"
                  value={item.totalCost}
                  onChange={(event) => updateItem(index, 'totalCost', event.target.value)}
                />
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={form.items.length === 1}
                    className="inline-flex h-[46px] w-full items-center justify-center rounded-xl border border-border text-fg-muted transition-colors hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-10"
                    aria-label={`Remove item ${index + 1}`}
                  >
                    <RiDeleteBinLine size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </form>
    </Modal>
  )
}

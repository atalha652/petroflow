import AdminOrderDetailsContent from './AdminOrderDetailsContent.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'

export default function OrderDetailsModal({ isOpen, onClose, order, onEdit }) {
  if (!order) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order details"
      description={`#${order.orderNumber} · ${order.client}`}
      size="lg"
      footer={
        <>
          <Button type="button" variant="secondary" className="sm:w-auto" onClick={onClose}>
            Close
          </Button>
          <Button
            type="button"
            className="sm:w-auto"
            onClick={() => {
              onClose()
              onEdit?.(order)
            }}
          >
            Edit order
          </Button>
        </>
      }
    >
      <AdminOrderDetailsContent order={order} showExtended />
    </Modal>
  )
}

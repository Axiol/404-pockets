import Modal from "@/components/modal"
import EditForm from "@/components/edit-form"
import { getStock } from "@/app/actions"

export const dynamic = "force-dynamic"

export default async function EditModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stock = await getStock(parseInt(id))

  return (
    <Modal>
      <EditForm stock={stock[0]} />
    </Modal>
  )
}

import Modal from "@/components/modal";
import RessourceForm from "@/components/ressource-form";

import { getRessourceOptions } from "@/app/actions"
export default async function AddModal() {
  const ressourceOptions = await getRessourceOptions()

  return (
    <Modal>
      <RessourceForm ressources={ressourceOptions} />
    </Modal>
  )
}

import RessourceForm from '@/components/ressource-form';
import type { Metadata } from 'next';

import { getRessourceOptions } from '../actions';

export const metadata: Metadata = {
  title: 'Ajouter une ressource - 404 Pockets',
  description: 'Ajouter une ressource à vos poches.',
}

export const dynamic = "force-dynamic"

export default async function AddPage() {
  const ressourceOptions = await getRessourceOptions()

  return (
    <>
      <h2 className="font-bold text-xl mb-9">Ajouter une ressource</h2>
      <RessourceForm ressources={ressourceOptions} />
    </>
  )
}

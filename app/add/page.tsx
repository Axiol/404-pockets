import RessourceForm from '@/components/ressource-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ajouter une ressource - 404 Pockets',
  description: 'Ajouter une ressource à vos poches.',
}

export default function AddPage() {
  return (
    <>
      <h2 className="font-bold text-xl mb-9">Ajouter une ressource</h2>
      <RessourceForm />
    </>
  )
}

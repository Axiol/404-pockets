import { getStock } from '@/app/actions'
import EditForm from '@/components/edit-form'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Modifier une ressource - 404 Pockets',
  description: 'Modifier une ressource de vos poches.',
}

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const stock = await getStock(parseInt(id))

  if (stock.length === 0) {
    redirect('/')
  }

  return (
    <>
      <h2 className="font-bold text-xl mb-9">Modifier une ressource</h2>
      <EditForm stock={stock[0]} />
    </>
  )
}

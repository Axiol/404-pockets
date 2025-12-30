export const dynamic = "force-dynamic"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold mb-4">404 - Page non trouvée</h2>
      <p className="text-muted-foreground mb-4">
        La page que vous recherchez n'existe pas.
      </p>
      <a href="/" className="underline">
        Retour à l'accueil
      </a>
    </div>
  )
}

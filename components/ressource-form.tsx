'use client'

import { useRouter } from "next/navigation"
import { Field, FieldLabel, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function RessourceForm() {
  const router = useRouter()

  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="ressource-name">
            Ressource
          </FieldLabel>
          <Input
            id="ressource-name"
            placeholder="Carinite (Pure)"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="quantity">
            Quantité
          </FieldLabel>
          <Input
            id="quantity"
            placeholder="123"
            required
          />
        </Field>

        <Field orientation="horizontal">
          <Button type="submit">Envoyer</Button>
          <Button onClick={() => router.back()} variant="outline" type="button">Annuler</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

'use client'

import Link from "next/link"
import { Field, FieldLabel, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function RessourceForm() {
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
          <Button variant="outline" type="button" asChild>
            <Link href="/">Annuler</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

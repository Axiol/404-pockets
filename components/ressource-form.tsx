'use client'

import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"
import { Field, FieldLabel, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Combobox } from "./combobox"
import { useState } from "react"

export default function RessourceForm() {
  const router = useRouter()
  const [createRessource, setCreateRessource] = useState<Boolean>(false)

  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="ressource-name">
            Ressource
          </FieldLabel>
          <Combobox />
        </Field>

        <Field>
          <div className="flex items-center space-x-2">
            <Switch id="create-ressource" onCheckedChange={(e) => setCreateRessource(e)} />
            <Label htmlFor="create-ressource">Créer une nouvelle ressource</Label>
          </div>
        </Field>

        {createRessource && (<>
          <Field>
            <FieldLabel htmlFor="ressource-name">
              Nom
            </FieldLabel>
            <Input
              id="ressource-name"
              placeholder="Carinite (Pure)"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="type">
              Type
            </FieldLabel>
            <Select defaultValue="">
              <SelectTrigger id="type">
                <SelectValue placeholder="Other" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Armor">Armor</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Weapons">Weapons</SelectItem>
                <SelectItem value="Utility">Utility</SelectItem>
                <SelectItem value="Ammo">Ammo</SelectItem>
                <SelectItem value="Vehicles">Vehicles</SelectItem>
                <SelectItem value="Sustenance">Sustenance</SelectItem>
                <SelectItem value="Container">Container</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </>)}

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

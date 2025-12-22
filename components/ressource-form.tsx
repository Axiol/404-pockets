'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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

interface RessourceFormProps {
  ressources: { id: number; name: string }[]
}

const formSchema = z.object({
  ressourceId: z.number().optional(),
  newRessourceName: z.string().optional(),
  newRessourceType: z.string().optional(),
  amount: z.number(),
})

export default function RessourceForm({ ressources }: RessourceFormProps) {
  const router = useRouter()
  const [createRessource, setCreateRessource] = useState<Boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ressourceId: undefined,
      newRessourceName: "",
      newRessourceType: "",
      amount: undefined,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Erreurs:", errors))}>
      <FieldGroup>
        <Controller
          name="ressourceId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="ressource-name">
                Ressource
              </FieldLabel>
              <Combobox
                options={ressources}
                value={field.value}
                onChange={field.onChange}
              />
            </Field>
          )}
        />

        <Field>
          <div className="flex items-center space-x-2">
            <Switch id="create-ressource" onCheckedChange={(e) => setCreateRessource(e)} />
            <Label htmlFor="create-ressource">Créer une nouvelle ressource</Label>
          </div>
        </Field>

        {createRessource && (<>
          <Controller
            name="newRessourceName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="ressource-name">
                  Nom
                </FieldLabel>
                <Input
                  {...field}
                  id="ressource-name"
                  placeholder="Carinite (Pure)"
                />
              </Field>
            )}
          />

          <Controller
            name="newRessourceType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="type">
                  Type
                </FieldLabel>
                <Select {...field}>
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
            )}
          />
        </>)}

        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="quantity">
                Quantité
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="quantity"
                placeholder="123"
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                required
              />
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button type="submit">Envoyer</Button>
          <Button onClick={() => router.back()} variant="outline" type="button">Annuler</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

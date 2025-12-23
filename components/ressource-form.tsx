'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"
import { Field, FieldLabel, FieldGroup, FieldError } from "./ui/field"
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
import { addStock, addRessource } from "./actions"
import { toast } from "sonner"

interface RessourceFormProps {
  ressources: { id: number; name: string }[]
}

const formSchema = z
  .object({
    ressourceId: z.number().optional(),
    newRessourceName: z.string().trim().min(1, "Le nom est requis").optional().or(z.literal("")),
    newRessourceType: z.string().min(1, "Le type est requis").optional().or(z.literal("")),
    amount: z.number().min(1, "La quantité doit être supérieure à 0"),
    createRessource: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.createRessource && data.ressourceId === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: "Veuillez sélectionner une ressource",
        path: ["ressourceId"],
      })
    }

    if (data.createRessource) {
      if (!data.newRessourceName || data.newRessourceName === "") {
        ctx.addIssue({
          code: 'custom',
          message: "Le nom est requis",
          path: ["newRessourceName"],
        })
      }
      if (!data.newRessourceType || data.newRessourceType === "") {
        ctx.addIssue({
          code: 'custom',
          message: "Le type est requis",
          path: ["newRessourceType"],
        })
      }
    }
  })

export default function RessourceForm({ ressources }: RessourceFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ressourceId: undefined,
      newRessourceName: "",
      newRessourceType: "",
      amount: 0,
      createRessource: false,
    },
  })

  const createRessource = form.watch("createRessource")

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    let ressourceId = data.ressourceId

    if (createRessource) {
      if (!data.newRessourceName || !data.newRessourceType) {
        toast.error("Erreur lors de la création de la ressource")
        return
      }

      const newRessource = await addRessource(data.newRessourceName, data.newRessourceType)

      if (!newRessource[0]?.id) {
        toast.error("Erreur lors de l'ajout à votre stock")
        return
      }

      ressourceId = newRessource[0].id
    }

    const newStock = await addStock(ressourceId as number, data.amount)

    if (!newStock || !newStock[0]?.id) {
      toast.error("Erreur lors de l'ajout à votre stock")
      return
    }

    toast.success("Ressource ajoutée avec succès")
    router.push('/')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {!createRessource && (
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
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}

        <Controller
          name="createRessource"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex items-center space-x-2">
                <Switch
                  id="create-ressource"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="create-ressource">Créer une nouvelle ressource</Label>
              </div>
            </Field>
          )}
        />

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
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                value={field.value || ""}
                type="number"
                id="quantity"
                placeholder="123"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  field.onChange(isNaN(value) ? 0 : value)
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

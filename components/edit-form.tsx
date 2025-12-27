'use client'

import * as z from "zod"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldDescription, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { deteleStock, updateStockAmount } from "@/app/actions"

const formSchema = z.object({
  amount: z.number()
})

interface EditFormProps {
  stock: {
    id: number
    amount: number
  }
}

export default function EditForm({ stock }: EditFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: stock.amount
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    if (data.amount === 0) {
      const detetedStock = await deteleStock(stock.id)

      if (detetedStock.length === 0) {
        toast.error("Une erreur est survenue lors de la suppression de la ressource.")
        return
      }

      toast.success("Ressource supprimée avec succès.")
      router.back()
      return
    }

    const updateStock = await updateStockAmount(stock.id, data.amount)

    if (updateStock.length === 0) {
      toast.error("Une erreur est survenue lors de la mise à jour de la ressource.")
      return
    }

    toast.success("Ressource mise à jour avec succès.")
    router.back()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="amount">Quantité</FieldLabel>
              <FieldDescription>Mettez 0 pour tout supprimer</FieldDescription>
              <Input
                value={field.value}
                type="number"
                id="amount"
                placeholder="Entrez la quantité"
                onChange={(e) => field.onChange(Number(e.target.value))}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button className="cursor-pointer" type="submit">Envoyer</Button>
          <Button className="cursor-pointer" onClick={() => router.back()} variant="outline" type="button">Annuler</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

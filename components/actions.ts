'use server'

import { neon } from "@neondatabase/serverless"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export const getRessourceOptions = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT id, name FROM ressources ORDER BY name ASC`;
  return data as { id: number; name: string }[];
}

export const addStock = async (ressourceId: number, amount: number) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const user = await currentUser()

  const sql = neon(process.env.DATABASE_URL);
  try {
    const data = await sql`INSERT INTO stocks (ressource_id, user_id, amount) VALUES (${ressourceId}, ${user?.id}, ${amount}) RETURNING id`;
    revalidatePath('/')
    return data
  } catch (error) {
    const e = error as { constraint?: string }
    if (e?.constraint && e.constraint === 'constraint_user_ressource') {
      const updateData = await addToExistingStcok(ressourceId, amount)
      return updateData
    }
  }
}

const addToExistingStcok = async (ressourceId: number, amount: number) => {
  console.log("Updating existing stock")
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const user = await currentUser()

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`UPDATE stocks SET amount = amount + ${amount} WHERE ressource_id = ${ressourceId} AND user_id = ${user?.id} RETURNING id`
  revalidatePath('/')
  return data
}

export const addRessource = async (name: string, type: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`INSERT INTO ressources (name, type) VALUES (${name}, ${type}) RETURNING id`
  return data
}

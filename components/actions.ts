'use server'

import { neon } from "@neondatabase/serverless"
import { currentUser } from '@clerk/nextjs/server'

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
  const data = await sql`INSERT INTO stocks (ressource_id, user_id, amount) VALUES (${ressourceId}, ${user?.id}, ${amount}) RETURNING id`;
  return data
}

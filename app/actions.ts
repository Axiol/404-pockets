'use server'

import { neon } from "@neondatabase/serverless";
import { currentUser } from '@clerk/nextjs/server'
import { Ressource } from "./columns";

export const listStocks = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT r.id, r.name, r.type, SUM(s.amount) as amount FROM ressources r INNER JOIN stocks s ON r.id = s.ressource_id GROUP BY r.id, r.name, r.type ORDER BY r.id`;
  return data as Ressource[];
}

export const getRessourceOptions = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT id, name FROM ressources ORDER BY name ASC`;
  return data as { id: number; name: string }[];
}

export const getStockForUser = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const user = await currentUser()

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT r.name, r.type, s.amount FROM stocks s JOIN ressources r ON s.ressource_id = r.id WHERE s.user_id = ${user?.id}`;
  return data as Ressource[]
}

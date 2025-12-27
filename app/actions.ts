'use server'

import { neon } from "@neondatabase/serverless";
import { currentUser, clerkClient } from '@clerk/nextjs/server'
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
  const data = await sql`SELECT r.name, r.type, s.id, s.amount FROM stocks s JOIN ressources r ON s.ressource_id = r.id WHERE s.user_id = ${user?.id}`;
  return data as Ressource[]
}

export const getStockDetails = async (ressourceId: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`
    SELECT s.user_id, s.amount
    FROM stocks s
    WHERE s.ressource_id = ${ressourceId}
    ORDER BY s.amount DESC
  `;

  const client = await clerkClient()
  const detailsWithUsernames = await Promise.all(
    data.map(async (stock) => {
      try {
        const user = await client.users.getUser(stock.user_id)
        return {
          userId: stock.user_id,
          username: user.username || user.firstName || user.emailAddresses[0]?.emailAddress || 'Utilisateur inconnu',
          amount: stock.amount,
        }
      } catch (error) {
        console.error(`Error fetching user ${stock.user_id}:`, error)
        return {
          userId: stock.user_id,
          username: 'Utilisateur inconnu',
          amount: stock.amount,
        }
      }
    })
  )

  return detailsWithUsernames
}

export const getStock = async (id: number) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
  }

  const user = await currentUser()

  const sql = neon(process.env.DATABASE_URL)
  const data = await sql`SELECT id, amount FROM stocks WHERE id = ${id} AND user_id = ${user?.id}`
  return data as { id: number, amount: number }[]
}

export const updateStockAmount = async (id: number, amount: number) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
  }

  const sql = neon(process.env.DATABASE_URL)
  const data = await sql`UPDATE stocks SET amount = ${amount} WHERE id = ${id} RETURNING id`
  return data as { id: number }[]
}

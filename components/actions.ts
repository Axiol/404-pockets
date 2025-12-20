'use server'

import { neon } from "@neondatabase/serverless";

export const getRessourceOptions = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`SELECT id, name FROM ressources ORDER BY name ASC`;
  return data as { id: number; name: string }[];
}

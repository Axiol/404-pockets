import { listStocks, getStockForUser } from "./actions";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"

export const dynamic = "force-dynamic"

export default async function Home() {
  const data = await listStocks()
  const userData = await getStockForUser()

  return (
    <DataTable columns={columns} data={data} userData={userData} />
  );
}

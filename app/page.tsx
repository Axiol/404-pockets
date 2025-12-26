import { listStocks, getStockForUser } from "./actions";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Home() {
  const data = await listStocks()
  const userData = await getStockForUser()

  return (
    <DataTable columns={columns} data={data} userData={userData} />
  );
}

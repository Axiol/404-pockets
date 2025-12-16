import { listStocks } from "./actions";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Home() {
  const data = await listStocks()

  return (
    <DataTable columns={columns} data={data} />
  );
}

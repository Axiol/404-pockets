import { columns, Ressource } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Ressource[]> {
  return [
    {
      id: "728ed52f",
      name: "FR-86",
      amount: 20,
    },
    {
      id: "728ed52f",
      name: "Carinite Pure",
      amount: 100,
    },
  ]
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="max-w-5xl mx-auto mt-10">
      <DataTable columns={columns} data={data} />
    </main>
  );
}

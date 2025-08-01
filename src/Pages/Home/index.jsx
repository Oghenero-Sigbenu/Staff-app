import { DashboardLayout, Table } from "../../Components";
import TopMenuNav from "../../Components/Dashboard/TopNav";
import { columns, data } from "../../Helpers/data";

export default function Home() {
  return (
    <DashboardLayout className="bg-[#f9f9f9] text-center">
      <TopMenuNav TitleHeader="Home" />
      <div className="w-[98%] mx-auto">
        <Table data={data} columns={columns} />
      </div>
    </DashboardLayout>
  );
}

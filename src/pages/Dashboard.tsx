import { CustomList } from "../components/CustomList";
import { CustomMap } from "../components/CustomMap/CustomMap";

function Dashboard() {
  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <CustomList />
      <CustomMap showStatusPanel />
    </section>
  );
}

export default Dashboard;

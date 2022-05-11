import { CustomList } from "../components/CustomList";
import { CustomMap } from "../components/CustomMap/CustomMap";

function Dashboard() {
  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <CustomList />
      <CustomMap
        showStatusPanel
        zoomLevel={7}
        defaultPosition={{
          Location: {
            Latitude: 0,
            Altitude: 0,
            Longitude: 0,
            AltitudeUnits: "meter",
          },
        }}
      />
    </section>
  );
}

export default Dashboard;

import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { CitiesContextProvider } from "../context/CitiesContext";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <CitiesContextProvider>
        <Sidebar />
        <User />
        <Map />
      </CitiesContextProvider>
    </div>
  );
}

export default AppLayout;

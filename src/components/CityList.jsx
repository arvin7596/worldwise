import { useCities } from "../context/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList() {
  const { cities } = useCities();
  return (
    <ul className={styles.cityList}>
      {cities.map((el) => (
        <CityItem city={el} key={el.id} />
      ))}
    </ul>
  );
}

export default CityList;

import { createContext, useCallback, useContext, useMemo } from "react";
import { useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getCities() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Some error");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(async function (id) {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Some error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNewCity = useCallback(
    async function addNewCity(city) {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:9000/cities/`, {
          method: "POST",
          body: JSON.stringify(city),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setCurrentCity(data);
        setCities([...cities, data]);
      } catch {
        alert("Some error");
      } finally {
        setIsLoading(false);
      }
    },
    [cities]
  );
  const deleteCity = useCallback(
    async function deleteCity(id) {
      setIsLoading(true);
      try {
        await fetch(`http://localhost:9000/cities/${id}`, {
          method: "DELETE",
        });
        const filteredCity = cities.filter((el) => el.id !== id);
        setCities(filteredCity);
      } catch {
        alert("Some error");
      } finally {
        setIsLoading(false);
      }
    },
    [cities]
  );
  const value = useMemo(() => {
    return {
      cities,
      isLoading,
      currentCity,
      getCity,
      addNewCity,
      deleteCity,
    };
  }, [cities, addNewCity, deleteCity, currentCity, getCity, isLoading]);

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("context is not in the provider");
  return context;
}

export { CitiesContextProvider, useCities };

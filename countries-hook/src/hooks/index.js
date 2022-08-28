import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        if (name !== "") {
          const country = await axios.get(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`
          );
          setCountry(country.data[0]);
        }
      } catch (error) {
        setCountry(null);
      }
    }
    fetchCountry();
  }, [name]);
  return country;
};

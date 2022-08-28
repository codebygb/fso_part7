import axios from "axios";
import { useEffect, useState } from "react";

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

export const useResource = (baseUrl) => {
  console.log("baseUrl", baseUrl);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => setResources([...resources, response.data]));
  };

  const service = {
    create,
  };

  return [resources, service];
};

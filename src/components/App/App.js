import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [nasaData, setNasaData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`);

      console.log(data);
      setNasaData(data);
    };

    getData();
  }, []);

  return (
    <div>
      {nasaData.map((d, idx) => (
        <Cards url={d.url} title={d.title} desc={d.explanation} key={idx} />
      ))}
    </div>
  );
};

export default App;

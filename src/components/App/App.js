import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";
import { CircularProgress } from "@material-ui/core";
import { makeStyles, Button } from "@material-ui/core";

const App = () => {
  const [nasaData, setNasaData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getData = async () => {
      console.log(page);
      const { data } = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-9-17&page=${page}&api_key=${API_KEY}`
      );

      console.log(data.photos);
      setNasaData([...nasaData, ...data.photos]);
    };

    getData();
  }, [page]);

  const pagination = () => {
    setPage(() => page + 1);
  };

  const useStyles = makeStyles({
    loading: {
      marginLeft: "50%",
      marginTop: 200,
    },
    load: {
      color: "red",
      marginBottom: 36,
      marginLeft: "10%",
    },
  });

  const classes = useStyles();

  return (
    <div>
      {nasaData.length <= 0 ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          {nasaData.map((item) => (
            <Cards
              url={item.img_src}
              title={item.rover.name}
              desc={item.camera.full_name}
              date={item.earth_date}
              key={item.id}
              id={item.id}
            />
          ))}
          <Button variant="contained" className={classes.load} onClick={pagination}>
            Load More
          </Button>
        </>
      )}
    </div>
  );
};

export default App;

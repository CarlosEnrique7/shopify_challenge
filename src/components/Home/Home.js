import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";
import { CircularProgress } from "@material-ui/core";
import { makeStyles, Button } from "@material-ui/core";
import Nav from "../Nav/Nav";

const Home = () => {
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
      marginTop: "50vh",
      marginLeft: "50vw",
      color: "#A64253",
    },
    load: {
      color: "red",
      marginBottom: 36,
      marginTop: 20,
      fontWeight: "bold",
    },
    wrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 24rem)",
      justifyContent: "space-evenly",
    },
    btnContainer: {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Nav className={classes.nav} />
      {nasaData.length <= 0 ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <>
          <div className={classes.wrapper}>
            {nasaData.map((item) => (
              <Cards
                url={item.img_src}
                title={item.rover.name}
                fullName={item.camera.full_name}
                name={item.camera.name}
                launch={item.rover.launch_date}
                land={item.rover.landing_date}
                date={item.earth_date}
                key={item.id}
                id={item.id}
              />
            ))}
          </div>
          <div className={classes.btnContainer}>
            <Button variant="contained" className={classes.load} onClick={pagination}>
              Load More
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

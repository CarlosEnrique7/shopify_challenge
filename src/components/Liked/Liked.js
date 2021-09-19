import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

const Liked = () => {
  const [likedData, setLikedData] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getData = async () => {
      const { data } = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-9-17&api_key=${API_KEY}`
      );

      console.log(data.photos);
      let arr = [];
      data.photos.map((item) => {
        if (localStorage.getItem(item.id)) {
          arr.push(item);
        }
      });
      setLikedData([...likedData, ...arr]);
    };
    getData();
  }, []);

  const useStyles = makeStyles({
    wrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 24rem)",
      justifyContent: "space-evenly",
    },
    center: {
      marginTop: "50vh",
      width: "90vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    text: {
      textAlign: "center",
      width: 200,
      marginLeft: 0,
      marginTop: 10,
    },
    loading: {
      color: "#A64253",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Nav />
      {likedData <= 0 ? (
        <div className={classes.center}>
          <CircularProgress className={classes.loading} />
          <Typography variant="body2" className={classes.text}>
            If you have not liked anything, <Link to="/"> try liking an image!</Link>
          </Typography>
        </div>
      ) : (
        likedData.map((item) => (
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
        ))
      )}
    </div>
  );
};

export default Liked;

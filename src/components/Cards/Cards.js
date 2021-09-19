import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./Cards.css";

const Cards = ({ url, title, desc, date, id }) => {
  const useStyles = makeStyles({
    card: {
      maxWidth: 375,
      margin: 20,
      borderRadius: 12,
    },
    photo: {
      height: 240,
      position: "relative",
    },
    btn: {
      background: "none",
      color: "red",
      "&:hover": {
        background: "none",
      },
      cursor: "pointer",
      marginLeft: 12,
    },
    hidden: {
      display: "none",
    },
    action: {
      cursor: "default",
    },
  });

  const classes = useStyles();

  const [isLiked, setIsLiked] = useState(false);
  const [doAnimation, setDoAnimation] = useState(false);

  useEffect(() => {
    let like = localStorage.getItem(id);
    setIsLiked(like);
  }, []);

  const setLike = () => {
    if (isLiked) {
      setIsLiked(false);
      localStorage.removeItem(id);
      setDoAnimation(false);
    }
    if (!isLiked) {
      setIsLiked(true);
      localStorage.setItem(id, true);
      setDoAnimation(true);
    }
  };

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.action} disableRipple>
        <CardMedia className={classes.photo} image={url} title={title} />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2258px-Love_Heart_SVG.svg.png"
          className={doAnimation ? "liked" : classes.hidden}
          alt="like animation"
        ></img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc.substring(0, 240) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isLiked ? (
          <span className={"material-icons-outlined " + classes.btn} onClick={setLike}>
            favorite_border
          </span>
        ) : (
          <span className={"material-icons " + classes.btn} onClick={setLike}>
            favorite
          </span>
        )}
      </CardActions>
    </Card>
  );
};

export default Cards;

import { AttachMoney, LocalHotel, Wc } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/styles";
import React from "react";

import { useNavigate } from "react-router-dom";

const useStyles = styled((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    // transition: theme.transitions.create("transform", {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Room({ room }) {
  const classes = useStyles;
  const navigate = useNavigate();
  const handleBook = (bedType) => {
    navigate(`/book/${bedType}`);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />

      <CardMedia
        className={classes.media}
        image={room.imgUrl}
        title="Paella dish"
      />
      <img src={`/images/${room.bedType}.png`} alt="" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LocalHotel />: {room.bed}
        </IconButton>
        <IconButton aria-label="share">
          <Wc />: {room.capacity}
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoney />: {room.price}
        </IconButton>
        <Button
          onClick={() => handleBook(room.bedType)}
          variant="contained"
          color="primary"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

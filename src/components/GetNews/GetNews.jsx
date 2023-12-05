import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import Header from "../Header/Header";
import useFetch from "../../hooks/fetchDataHook";
import "./GetNews.css";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GetNews = () => {
  const key = "0bb256ad9e2d4c6e94ce7be72c2beb4c";
  const api = `https://newsapi.org/v2/everything?q=premier-league&sortBy=relevancy&language=en&apiKey=${key}`;

  const { data } = useFetch(api);

  const [expanded, setExpanded] = useState(
    Array(data?.articles.length).fill(false)
  );

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="news-section">
      <Header />
      <div className="news__container">
        {data &&
          data.articles.map((news, idx) => (
            <Card sx={{ width: 345 }} key={idx}>
              <CardMedia
                sx={{ height: 140 }}
                image={news.urlToImage}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  fontSize={16}
                >
                  {news.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                >
                  {news.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded[idx]}
                  onClick={() => handleExpandClick(idx)}
                  aria-expanded={expanded[idx]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[idx]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph color="text.secondary">
                    {news.content}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default GetNews;

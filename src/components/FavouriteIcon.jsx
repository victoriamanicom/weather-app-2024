import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

function FavouriteIcon({ filled }) {
  if (filled) {
    return <Star />;
  } else {
    return <StarBorder />;
  }
}

export default FavouriteIcon;

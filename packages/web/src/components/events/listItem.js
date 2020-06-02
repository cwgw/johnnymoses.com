/** @jsx jsx */
import { jsx } from "theme-ui";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import VisuallyHidden from "@reach/visually-hidden";

import { Link } from "../common";

const Item = ({ date, location, title, url }) => {
  return (
    <div
      sx={{
        position: "relative",
        px: 4,
        py: 3,
        borderWidth: 1,
        borderColor: "grays.2",
        borderStyle: "solid",
        borderRadius: 2,
        "& > *": {
          m: 0,
        },
      }}
    >
      <p>
        <span
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {format(new Date(date), "MMM d, yyyy")}
        </span>{" "}
        <small>– {formatDistanceToNow(new Date(date))} from today</small>
      </p>
      <h3>{title}</h3>
      <p>{location}</p>
      <Link to={url} variant="span" target="_blank">
        <VisuallyHidden>
          View more info about this event ("{title}")
        </VisuallyHidden>
      </Link>
    </div>
  );
};

export default Item;

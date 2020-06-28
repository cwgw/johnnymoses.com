/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "../box";
import Heading from "../heading";
import EventCard from "../events/card";
import Grid from "../grid";

const EventListModule = props => {
  const { title, events, className } = props;

  return (
    <Box
      className={className}
      sx={{
        mx: "auto",
        maxWidth: "full",
      }}
    >
      {title && (
        <Heading
          sx={{
            px: 4,
          }}
        >
          {title}
        </Heading>
      )}
      <Grid
        as="ul"
        sx={{
          p: 0,
        }}
      >
        {events.map(event => (
          <li key={event._id} sx={{ listStyle: "none" }}>
            <EventCard {...event} />
          </li>
        ))}
      </Grid>
    </Box>
  );
};

export default EventListModule;

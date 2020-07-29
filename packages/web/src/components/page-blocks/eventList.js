/** @jsx jsx */
import { jsx } from "theme-ui";
// import { useStaticQuery, graphql } from 'gatsby';

import Box from "../box";
import Heading from "../heading";
import EventCard from "../events/card";
import Grid from "../grid";

const EventListModule = ({ title, events, ...props }) => {
  // const data = useStaticQuery(graphql`
  //   query AllEvents($today: Date) {
  //     allSanityEvent (
  //       filter: { content: {main: {start: {gt: $today}}}}
  //     ) {
  //       edges {
  //         node {
  //           _rawContent
  //         }
  //       }
  //     }
  //   }
  // `);
  // console.log({data})

  return (
    <Box mx={4} py={5} {...props}>
      <Box variant="container">
        {title && <Heading px={4}>{title}</Heading>}
        <Grid as="ul" columns={[1, 1, 2]}>
          {events.map(event => (
            <Box key={event._id} as="li">
              <EventCard {...event} />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EventListModule;

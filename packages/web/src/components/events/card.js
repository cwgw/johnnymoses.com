/** @jsx jsx */
import { jsx } from "theme-ui";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import differenceInMonths from "date-fns/differenceInMonths";
import slugify from "slugify";
import VisuallyHidden from "@reach/visually-hidden";

import { createIcsDataUri } from "../../utils/iCalendar";

import BlockContent from "../page-blocks/blockContent";
import Heading from "../heading";
import Text from "../text";
import Box from "../box";
import Flex from "../flex";
import Link from "../link";

const EventCard = ({
  content: {
    main: {
      description,
      end,
      location,
      start,
      title,
      created,
      updated,
      uid,
      htmlLink,
    },
  },
  className,
}) => {
  const today = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);
  let dateFromNow =
    differenceInMonths(startDate, today) > 1
      ? `${formatDistanceToNow(startDate)} from now`
      : `In ${formatDistanceToNow(startDate)}`;

  if (startDate < today) {
    dateFromNow = `${formatDistanceToNow(startDate)} ago`;
  }

  return (
    <Flex
      as="article"
      className={className}
      itemScope
      itemType="http://schema.org/Event"
      sx={{
        flexFlow: "column nowrap",
        px: 4,
        py: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grays.700",
        borderRadius: 3,
      }}
    >
      <header>
        <Text as="p" color="grays.500" variant="small">
          {dateFromNow}
        </Text>
        <Heading as="h3" mb={3} itemProp="name">
          {title}
        </Heading>
      </header>
      {/* <BlockContent
        blocks={description}
        itemProp="description"
        sx={{
          mb: 4,
          color: "grays.400"
        }}
      /> */}
      <Flex
        sx={{
          mt: "auto",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Text as="p" variant="small" itemProp="startDate" content={start}>
            {format(startDate, "MMMM do, yyyy")}
          </Text>
          <VisuallyHidden itemProp="endDate" content={end}>
            {format(endDate, "MMMM do, yyyy")}
          </VisuallyHidden>
          {location && (
            <Text as="p" variant="small" itemProp="location">
              {location}
            </Text>
          )}
        </Box>
        <Link to={htmlLink} ml="auto" mr={2} children="Google Calendar" />
        <Link
          to={createIcsDataUri({
            summary: title,
            description,
            endDate: end,
            location,
            startDate: start,
            created,
            updated,
            uid,
          })}
          download={`${slugify(title, { lower: true })}.ics`}
          children=".ics"
        />
      </Flex>
    </Flex>
  );
};

export default EventCard;

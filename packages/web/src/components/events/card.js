/** @jsx jsx */
import { jsx } from "theme-ui";
import styled from "@emotion/styled";
import { css } from "@theme-ui/css";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import differenceInMonths from "date-fns/differenceInMonths";
import slugify from "slugify";
import VisuallyHidden from "@reach/visually-hidden";

import { createIcsDataUri } from "../../utils/iCalendar";

import Heading from "../heading";
import Text from "../text";
import Box from "../box";
import Flex from "../flex";
import Link from "../link";

const Card = styled(Box)(
  css({
    display: "flex",
    flexFlow: "column nowrap",
    px: 4,
    py: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grays.700",
    borderRadius: 3,
  })
);

const EventCard = ({
  content: {
    main: { description, end, location, start, title, created, updated, uid },
  },
  className,
}) => {
  const ics = createIcsDataUri({
    summary: title,
    description,
    endDate: end,
    location,
    startDate: start,
    created,
    updated,
    uid,
  });

  const dateFromNow =
    differenceInMonths(new Date(start), new Date()) > 1
      ? `${formatDistanceToNow(new Date(start))} from now`
      : `In ${formatDistanceToNow(new Date(start))}`;

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
      <Text
        dangerouslySetInnerHTML={{ __html: description }}
        mb={4}
        color="grays.400"
        itemProp="description"
      />
      <Flex
        sx={{
          mt: "auto",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Text as="p" variant="small" itemProp="startDate" content={start}>
            {format(new Date(start), "MMMM do, yyyy")}
          </Text>
          <VisuallyHidden itemProp="endDate" content={end}>
            {format(new Date(end), "MMMM do, yyyy")}
          </VisuallyHidden>
          {location && (
            <Text as="p" variant="small" itemProp="location">
              {location}
            </Text>
          )}
        </Box>
        <Link
          href={ics}
          download={`${slugify(title, { lower: true })}.ics`}
          ml="auto"
        >
          ics
        </Link>
      </Flex>
    </Flex>
  );
};

export default EventCard;

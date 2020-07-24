/** @jsx jsx */
import { jsx } from "theme-ui";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import differenceInMonths from "date-fns/differenceInMonths";
import slugify from "slugify";

import { createIcsDataUri } from "../../utils/iCalendar";

import BlockContent from "../page-blocks/blockContent";
import Heading from "../heading";
import Text from "../text";
import Box from "../box";
import Flex from "../flex";
import Link from "../link";
import Icon from "../icon";
import LinkedData from "./linkedData";
import MenuButton from "../menuButton";

const EventCard = ({ content, className }) => {
  const {
    main: {
      description,
      descriptionText,
      end,
      location,
      start,
      title,
      htmlLink,
    },
  } = content;

  const today = new Date();
  const startDate = new Date(start);
  const dateFromNow =
    startDate < today
      ? `${formatDistanceToNow(startDate)} ago`
      : differenceInMonths(startDate, today) > 1
      ? `${formatDistanceToNow(startDate)} from now`
      : `In ${formatDistanceToNow(startDate)}`;

  const icsURL = createIcsDataUri({
    ...content.main,
    summary: title,
    description: descriptionText,
    endDate: end,
    startDate: start,
  });
  const icsFileName = `${slugify(title, { lower: true })}.ics`;

  return (
    <Flex
      as="article"
      className={className}
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
      <LinkedData {...content} />
      <header>
        <Text as="p" color="grays.500" variant="small">
          <Icon icon="calendar" />
          &ensp;
          {dateFromNow}
        </Text>
        <Heading as="h3" mb={3}>
          {title}
        </Heading>
      </header>
      <BlockContent blocks={description} mb={4} color="grays.400" />
      <Flex mt="auto" alignItems="end">
        <Box>
          <Text as="p" variant="small" itemProp="startDate" content={start}>
            <Icon icon="clock" />
            &ensp;
            {format(startDate, "MMMM do, yyyy")}
          </Text>
          {location && (
            <Text as="p" variant="small">
              <Icon icon="map-pin" />
              &ensp;
              {location}
            </Text>
          )}
        </Box>
        <MenuButton
          ml="auto"
          variant="plain"
          fontSize={1}
          value="Add to your calendar"
        >
          <Link to={htmlLink}>
            <Icon icon="external-link" /> Google Calendar
          </Link>
          <Link to={icsURL} download={icsFileName}>
            <Icon icon="download" /> Other (.ics)
          </Link>
        </MenuButton>
      </Flex>
    </Flex>
  );
};

export default EventCard;

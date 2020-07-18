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
          {dateFromNow}
        </Text>
        <Heading as="h3" mb={3}>
          {title}
        </Heading>
      </header>
      <BlockContent
        blocks={description}
        sx={{
          mb: 4,
          color: "grays.400",
        }}
      />
      <Flex
        sx={{
          mt: "auto",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Text as="p" variant="small" itemProp="startDate" content={start}>
            <Icon icon="Calendar" />
            {format(startDate, "MMMM do, yyyy")}
          </Text>
          {location && (
            <Text as="p" variant="small">
              <Icon icon="MapPin" />
              {location}
            </Text>
          )}
        </Box>
        <Link to={htmlLink} ml="auto" mr={2} children="Google Calendar" />
        <Link
          to={createIcsDataUri({
            ...content.main,
            summary: title,
            description: descriptionText,
            endDate: end,
            startDate: start,
          })}
          download={`${slugify(title, { lower: true })}.ics`}
          children=".ics"
        />
      </Flex>
    </Flex>
  );
};

export default EventCard;

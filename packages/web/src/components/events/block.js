/** @jsx jsx */
import { jsx } from "theme-ui";

import List from "./list";
import NewsletterForm from "../newsletterSubscriptionForm";

const EventsBlock = ({ textContent }) => {
  const events = [];

  return (
    <div>
      <div
        sx={{
          px: 4,
          gridColumn: "1 / -1",
        }}
        dangerouslySetInnerHTML={{ __html: textContent }}
      />
      <List events={events || []} />
      <NewsletterForm
        sx={{
          position: "sticky",
          top: 0,
        }}
      />
    </div>
  );
};

export default EventsBlock;

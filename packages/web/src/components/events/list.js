/** @jsx jsx */
import { jsx } from "theme-ui";

import Item from "./listItem";

/**
 * TO DO
 *
 * empty state!
 */

const List = ({ events, className }) => (
  <ul>
    {events &&
      events.map(event => <Item as="li" key={event.title} {...event} />)}
  </ul>
);

export default List;

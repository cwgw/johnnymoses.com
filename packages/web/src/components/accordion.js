/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import {
  Accordion as ReachAccordion,
  AccordionItem as ReachAccordionItem,
  AccordionButton as ReachAccordionButton,
  AccordionPanel as ReachAccordionPanel,
} from "@reach/accordion";

import Box from "./box";
import Button from "./button";
import Heading from "./heading";

const Accordion = ({ items, children: _children, ...props }) => {
  const children = React.Children.map(_children, child => {
    const { heading, ...childProps } = child.props;
    return (
      <Box as={ReachAccordionItem} mb={3}>
        <Heading
          as="h3"
          variant="plain"
          mb={2}
          sx={{
            "[data-state='open'] &": {
              fontWeight: "bold",
            },
          }}
        >
          <Button as={ReachAccordionButton} variant="plain">
            {heading}
          </Button>
        </Heading>
        {React.createElement(ReachAccordionPanel, {
          as: child.type,
          ...childProps,
        })}
      </Box>
    );
  });

  return (
    <Box as={ReachAccordion} {...props}>
      {children}
    </Box>
  );
};

export default Accordion;

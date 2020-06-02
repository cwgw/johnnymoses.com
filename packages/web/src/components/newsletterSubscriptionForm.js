/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import uniqueId from "lodash/uniqueId";

import { Button, Link, Input, Label } from "./common";

const Form = ({ className }) => {
  const id = React.useRef(uniqueId("input"));

  return (
    <div
      className={className}
      sx={{
        textAlign: "center",
        backgroundColor: "grays.1",
        px: 5,
        py: 4,
      }}
    >
      <p sx={{ m: 0 }}>
        <strong>Stay informed of upcoming events.</strong>
      </p>
      <p sx={{ mt: 0 }}>
        Subscribe to the{" "}
        <Link to="//www.redcedarcircle.org/" target="_blank">
          Red Cedar Circle
        </Link>{" "}
        Newsletter
      </p>
      <form
        sx={{
          overflow: "hidden",
        }}
      >
        <div
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            ml: -3,
          }}
        >
          <div
            sx={{
              ml: 3,
            }}
          >
            <Label htmlFor={id.current}>Your Email</Label>
            <Input type="email" name="email" id={id.current} />
          </div>
          <Button
            type="submit"
            sx={{
              ml: 3,
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;

/** @jsx jsx */
import { jsx } from "theme-ui";

import Grid from "../grid";
import Heading from "../heading";
import BlockContent from "./blockContent";
import Form from "./form";
import Box from "../box";

const NewsEvents = props => {
  // console.log("NewsEvents", { props });

  return <Box></Box>;

  // return (
  //   <Grid
  //     className={className}
  //     columns={[1, null, 2]}
  //     sx={{
  //       mx: "auto",
  //       maxWidth: "full",
  //     }}
  //   >
  //     {title && (
  //       <Heading
  //         sx={{
  //           px: 4,
  //           gridColumn: "1/-1",
  //         }}
  //       >
  //         {title}
  //       </Heading>
  //     )}
  //     {text && <BlockContent px={4} blocks={text} />}
  //     {formModule && (
  //       <aside>
  //         <Form
  //           {...formModule}
  //           sx={{
  //             position: "sticky",
  //             top: 0,
  //             bottom: 0,
  //             px: 4,
  //             alignSelf: "start",
  //           }}
  //         />
  //       </aside>
  //     )}
  //   </Grid>
  // );
};

export default NewsEvents;
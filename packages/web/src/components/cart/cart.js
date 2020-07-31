/** @jsx jsx */
import { jsx } from "theme-ui";

import Heading from "../heading";
import Box from "../box";
import LineItemList from "./lineItems";
import Summary from "./summary";
import Grid from "../grid";
import Flex from "../flex";

const Cart = () => {
  return (
    <Grid
      variant="container"
      gridTemplateColumns={["1fr", null, "2fr 1fr"]}
      sx={
        {
          // alignItems: "start"
        }
      }
    >
      <Box>
        <Heading px={4}>Your Cart</Heading>
        <LineItemList />
      </Box>
      <Flex maxHeight="100vh" sx={{ placeItems: "center" }}>
        <Summary sx={{ position: "sticky", top: 0 }} title={null} />
      </Flex>
    </Grid>
  );
};

// const Cart = () => {
//   return (
//     <React.Fragment>
//       <Heading
//         sx={{
//           variant: "container",
//           px: 4,
//         }}
//       >
//         Your Cart
//       </Heading>
//       <Box variant="container" mb={[0, 4]}>
//         <LineItemList />
//       </Box>
//       <Box sx={{ backgroundColor: "grays.900", mx: [0, 0, 4], py: 4 }}>
//         <Box variant="container">
//           <Summary sx={{ maxWidth: [null, "half"], ml: "auto" }} title={null} />
//         </Box>
//       </Box>
//     </React.Fragment>
//   );
// };

export default Cart;

/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "../box";
import Button from "../button";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";
import Link from "../link";

import useProductURL from "../../hooks/useProductURL";

import Form from "./form";
import LinkedData from "./linkedData";

const ProductCard = ({ content, _type }) => {
  const { main, shopify } = content;

  const isThirdParty = _type === "productThirdParty";

  const slug = useProductURL(main.slug && main.slug.current);
  const url = isThirdParty ? main.url : slug;

  return (
    <Flex
      as="article"
      sx={{
        position: "relative",
        border: "1px solid",
        borderColor: "grays.700",
        flexFlow: "column nowrap",
        textAlign: "center",
      }}
    >
      {shopify && <LinkedData {...content} />}
      {main.mainImage && (
        <Box>
          <Image width={400} {...main.mainImage} />
        </Box>
      )}
      <Flex
        sx={{
          flexFlow: "column nowrap",
          flexBasis: "100%",
          p: 3,
        }}
      >
        <Heading as="h4" variant="body" mb={3}>
          <Link
            to={url}
            variant="fill"
            sx={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
            {main.title}
          </Link>
        </Heading>
        {isThirdParty ? (
          <Button to={main.url} variant="secondary" mt="auto">
            Buy from <strong>{main.vendorName}</strong>
          </Button>
        ) : (
          <Form
            {...shopify}
            withPrice
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              alignItems: "stretch",
              mt: "auto",
              dl: {
                alignSelf: "center",
                mb: 3,
              },
              button: {
                position: "relative",
                zIndex: 1,
              },
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ProductCard;

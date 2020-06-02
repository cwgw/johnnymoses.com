// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import siteGlobal from "./types/siteGlobal";
import page from "./types/page";
import menu from "./types/menu";
import bookingForm from "./types/bookingForm";

// Page Modules
import blockContent from "./modules/blockContent";
import externalLink from "./modules/externalLink";
import formField from "./modules/formField";
import hero from "./modules/hero";
import imageModule from "./modules/imageModule";
import internalLink from "./modules/internalLink";
import metaCard from "./modules/metaCard";
import moduleContent from "./modules/moduleContent";
import nestedPages from "./modules/nestedPages";
import pageItem from "./modules/pageItem";
import pageModule from "./modules/pageModule";
import social from "./modules/social";
import standardText from "./modules/standardText";
import bookingFormModule from "./modules/bookingFormModule";

// GraphQL Tab Modules
import globalContent from "./tabs/globalContent";
import pageContent from "./tabs/pageContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    siteGlobal,
    page,
    menu,
    bookingForm,

    blockContent,
    externalLink,
    formField,
    hero,
    imageModule,
    internalLink,
    metaCard,
    moduleContent,
    nestedPages,
    pageItem,
    pageModule,
    social,
    standardText,
    bookingFormModule,

    globalContent,
    pageContent,
  ]),
});

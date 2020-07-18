// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import siteGlobal from "./types/siteGlobal";
import page from "./types/page";
import menu from "./types/menu";
import form from "./types/form";
import productVariant from "./types/productVariant";
import product from "./types/product";
import collection from "./types/collection";
import event from "./types/event";
import calendar from "./types/calendar";

// Page Blocks
// import formModule from "./pageModules/formModule";
// import heroModule from "./pageModules/heroModule";
// import imageModule from "./pageModules/imageModule";
// import textModule from "./pageModules/textModule";
// import basicTextFormModule from "./pageModules/basicTextFormModule";
// import basicTextImageModule from "./pageModules/basicTextImageModule";
// import productGridModule from "./pageModules/productGridModule";
// import eventListModule from "./pageModules/eventListModule";
// import * as pageBlocks from './pageModules'
import * as PageBlockSchemas from "./page-blocks";

// misc
import blockContent from "./fields/blockContent";
import externalLink from "./fields/externalLink";
import formField from "./fields/formField";
import internalLink from "./fields/internalLink";
import menuItem from "./fields/menuItem";

// modules
import metaCard from "./modules/metaCard";
import moduleContent from "./modules/moduleContent";
import pageItem from "./modules/pageItem";
import pageModule from "./modules/pageModule";
import social from "./modules/social";
import routes from "./modules/routes";
import eventModule from "./modules/eventModule";

// product modules
import productModule from "./modules/productModule";
import shopifyProductModule from "./modules/shopifyProductModule";
import variantModule from "./modules/variantModule";
import shopifyVariantModule from "./modules/shopifyVariantModule";
import defaultVariant from "./modules/defaultVariant";

// GraphQL Tab Modules
import globalContent from "./tabs/globalContent";
import pageContent from "./tabs/pageContent";
import productContent from "./tabs/productContent";
import variantContent from "./tabs/variantContent";
import eventContent from "./tabs/eventContent";

import productThirdParty from "./types/productThirdParty";
import productThirdPartyContent from "./tabs/productThirdPartyContent";
import productThirdPartyModule from "./modules/productThirdPartyModule";

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
    form,
    productVariant,
    product,
    collection,
    calendar,

    ...Object.values(PageBlockSchemas),

    blockContent,
    externalLink,
    formField,
    internalLink,
    menuItem,

    metaCard,
    moduleContent,
    pageItem,
    pageModule,
    social,
    routes,

    productModule,
    shopifyProductModule,
    variantModule,
    shopifyVariantModule,
    defaultVariant,

    globalContent,
    pageContent,
    productContent,
    variantContent,

    event,
    eventModule,
    eventContent,

    productThirdParty,
    productThirdPartyContent,
    productThirdPartyModule,
  ]),
});

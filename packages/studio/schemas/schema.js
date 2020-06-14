// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import siteGlobal from "./types/siteGlobal";
import page from "./types/page";
import menu from "./types/menu";
import form from "./types/form";
import productVariant from "./types/variant";
import product from "./types/product";
import collection from "./types/collection";

// Page Modules
import formModule from "./modules/formModule";
import heroModule from "./modules/heroModule";
import imageModule from "./modules/imageModule";
import textModule from "./modules/textModule";
import nestedPages from "./modules/nestedPages";
import productGridModule from "./modules/productGrid";

import blockContent from "./modules/blockContent";
import externalLink from "./modules/externalLink";
import formField from "./modules/formField";
import internalLink from "./modules/internalLink";
import metaCard from "./modules/metaCard";
import moduleContent from "./modules/moduleContent";
import pageItem from "./modules/pageItem";
import pageModule from "./modules/pageModule";
import social from "./modules/social";

// product modules
import productModule from "./modules/productContent";
import shopifyProductModule from "./modules/shopifyProductModule";
import variantModule from "./modules/variantModule";
import shopifyVariantModule from "./modules/shopifyVariantModule";
import defaultVariant from "./modules/defaultVariant";

// GraphQL Tab Modules
import globalContent from "./tabs/globalContent";
import pageContent from "./tabs/pageContent";
import productContent from "./tabs/productContent";
import variantContent from "./tabs/variantContent";

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

    formModule,
    heroModule,
    imageModule,
    textModule,
    nestedPages,
    productGridModule,

    blockContent,
    externalLink,
    formField,
    internalLink,
    metaCard,
    moduleContent,
    pageItem,
    pageModule,
    social,

    productModule,
    shopifyProductModule,
    variantModule,
    shopifyVariantModule,
    defaultVariant,

    globalContent,
    pageContent,
    productContent,
    variantContent,
  ]),
});

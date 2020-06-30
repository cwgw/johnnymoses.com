// shared components
import Box from "./components/box";
import Button from "./components/button";
import Figure from "./components/figure";
import Flex from "./components/flex";
import Footer from "./components/footer";
import FormField from "./components/formField";
import Grid from "./components/grid";
import Header from "./components/header";
import Heading from "./components/heading";
import Image from "./components/image";
import Input from "./components/input";
import Label from "./components/label";
import Link from "./components/link";
import Text from "./components/text";
import Textarea from "./components/textarea";

// products
import ProductCard from "./components/products/card";

// events
import EventCard from "./components/events/card";

// page-blocks
import * as PageBlocks from "./components/page-blocks";
import renderPageModules from "./utils/renderPageModules";

// local component context
import { ComponentProvider, useLocalComponent } from './context/components'

// sanity client context
import { SanityClientProvider, useSanityClient } from './context/sanityClient'

// theme
import theme from "./theme";

// fonts
import fonts from "./fonts";

import globalStyles from './global'

export {
  Box,
  Button,
  Figure,
  Flex,
  Footer,
  FormField,
  Grid,
  Header,
  Heading,
  Image,
  Input,
  Label,
  Link,
  Text,
  Textarea,
  ProductCard,
  EventCard,
  PageBlocks,
  renderPageModules,
  useLocalComponent,
  ComponentProvider,
  SanityClientProvider,
  useSanityClient,
  theme,
  fonts,
  globalStyles,
};

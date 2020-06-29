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

// local component provider
import { useLocalComponent, ComponentProvider } from './context/components'

// theme
import theme from "./theme";

// fonts
import fonts from "./fonts";

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
  theme,
  fonts,
};

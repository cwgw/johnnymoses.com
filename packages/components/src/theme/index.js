import * as tokens from "./tokens";
import * as variants from "./variants";
import * as styles from "./styles";

export const theme = {
  ...tokens,
  styles,
  ...variants,
};

export default theme;

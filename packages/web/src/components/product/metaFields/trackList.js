/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "../../box";

const TR = props => <Box as="tr" px={3} mx={-3} {...props} />;
const TH = props => <Box as="th" textAlign="left" {...props} />;
const TD = props => <Box as="td" textAlign="left" {...props} />;

const TrackList = ({ tracks, ...props }) => {
  return (
    <Box as="details" {...props}>
      <summary>Track listing</summary>
      <Box
        heading=""
        as="table"
        sx={{
          borderCollapse: "collapse",
          width: "100%",
          "th, td": {
            py: 1,
            px: 2,
            fontSize: 1,
            verticalAlign: "bottom",
          },
        }}
      >
        <thead>
          <TR>
            <TH textAlign="right">No.</TH>
            <TH>Title</TH>
            <TH textAlign="right">Length</TH>
          </TR>
        </thead>
        <tbody>
          {tracks.map(({ _key, name, duration }, i) => (
            <TR
              key={_key}
              backgroundColor={i % 2 ? "transparent" : "grays.900"}
            >
              <TD textAlign="right">{i + 1}.</TD>
              <TD>{name}</TD>
              <TD textAlign="right">{duration}</TD>
            </TR>
          ))}
        </tbody>
      </Box>
    </Box>
  );
};

export default TrackList;

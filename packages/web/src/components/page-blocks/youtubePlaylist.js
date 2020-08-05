import React from "react";

import Grid from "../grid";
import PortableText from "../portableText";
import YoutubeEmbed from "../youtubeEmbed";
import Accordion from "../accordion";

import Icon from "../icon";
import Box from "../box";

const YoutubePlaylist = ({ text, videos, ...props }) => {
  return (
    <Box mx={4} py={5} backgroundColor="grays.900" {...props}>
      <Grid
        variant="container"
        columns={[1, null, 2]}
        px={[4, 0]}
        sx={{
          alignItems: "center",
        }}
      >
        {text && (
          <PortableText
            textAlign="center"
            maxWidth="third"
            sx={{ justifySelf: "center" }}
            blocks={text}
          />
        )}
        {videos && videos.length > 0 && (
          <Accordion>
            {videos.map(({ _key, url, title }) => (
              <YoutubeEmbed
                key={_key}
                heading={
                  <span>
                    <Icon icon="youtube" mr={2} />
                    {title}
                  </span>
                }
                videoId={getVideoId(url)}
                title={title}
                modestbranding
              />
            ))}
          </Accordion>
        )}
      </Grid>
    </Box>
  );
};

function getVideoId(_url) {
  let url;
  try {
    url = new URL(_url);
  } catch {
    console.warn(`Couldn't get video ID from url string "${_url}"`);
  }

  const { searchParams } = url;

  const v = searchParams.get("v");

  if (v) {
    return v;
  }

  return null;
}

export default YoutubePlaylist;

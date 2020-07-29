import React from "react";
import camelCase from "lodash/camelCase";
import queryString from "query-string";

import { includeProps, omitProps } from "../utils/filterProps";

import Iframe from "./iframe";

const defaultProps = {
  width: 640,
  height: 360,
};

const youtubeSearchParams = [
  "autoplay",
  "cc_lang_pref",
  "cc_load_policy",
  "color",
  "controls",
  "disablekb",
  "enablejsapi",
  "end",
  "fs",
  "hl",
  "iv_load_policy",
  "list",
  "listType",
  "loop",
  "modestbranding",
  "origin",
  "playlist",
  "playsinline",
  "rel",
  "showinfo",
  "start",
  "widget_referrer",
];

const youtubeParamPropNames = youtubeSearchParams.map(camelCase);

const getParamProps = includeProps(youtubeParamPropNames);
const omitParamProps = omitProps(youtubeParamPropNames);

const YoutubeEmbed = ({ title, videoId, ...props }) => {
  if (!videoId) {
    return null;
  }

  const params = getParamProps(props);
  const search = params ? "?" + queryString.stringify(params) : "";
  const src = `https://www.youtube.com/embed/${videoId}${search}`;

  return (
    <Iframe
      src={src}
      allow="autoplay; encrypted-media"
      allowfullscreen
      {...omitParamProps(props)}
    />
  );
};

YoutubeEmbed.defaultProps = defaultProps;

export default YoutubeEmbed;

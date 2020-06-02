/** @jsx jsx */
import { jsx } from "theme-ui";
import GatsbyImage from "gatsby-image";

const StorytellingBlock = ({ textContent, image }) => {
  return (
    <div>
      <div sx={{ px: 4 }} dangerouslySetInnerHTML={{ __html: textContent }} />
      {image && <GatsbyImage {...image} />}
    </div>
  );
};

export default StorytellingBlock;

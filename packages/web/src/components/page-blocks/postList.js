import React from "react";

import Heading from "../heading";
import Box from "../box";
import Grid from "../grid";
import PostCard from "../posts/card";

const PostList = ({ title, posts, ...props }) => {
  return (
    <Box mx={4} py={5} {...props}>
      <Box variant="container" {...props}>
        {title && <Heading px={4}>{title}</Heading>}
        {posts && (
          <Grid as="ul" columns={[1, 1, 2]}>
            {posts.map(post => (
              <Box key={post.id} as="li">
                <PostCard {...post} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default PostList;

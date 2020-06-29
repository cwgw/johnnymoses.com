import { Link as StyledLink } from '@johnnymoses.com/components'
import { Link as GatsbyLink } from 'gatsby'

export default ({ to, href, ...props }) => {
  const url = to || href;
  const isInternal = /^\/(?!\/)/.test(url);

  if (isInternal) {
    return (
      <StyledLink
        as={GatsbyLink}
        to={url}
        {...props}
      />
    )
  }

  return (
    <StyledLink
      href={url}
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  );
}

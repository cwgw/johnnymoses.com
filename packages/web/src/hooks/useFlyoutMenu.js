import React from "react";
import { usePopper } from "react-popper";

/**
 * @see https://www.w3.org/WAI/tutorials/menus/flyout/
 */
const useFlyoutMenuItem = (
  { placement, collapseDelay } = { placement: "bottom-end", collapseDelay: 500 }
) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const hoverTimeout = React.useRef(null);
  const focusTimeout = React.useRef(null);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        // { name: "offset", options: { offset } },
      ],
      strategy: "absolute",
      placement,
    }
  );

  React.useLayoutEffect(() => {
    if (isExpanded) {
      update();
    }
  }, [isExpanded, update]);

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      setExpanded(b => !b);
      setActive(b => !b);
    },
    [setExpanded]
  );

  const onMouseEnter = React.useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    setExpanded(true);
    setActive(true);
  }, [hoverTimeout, setExpanded]);

  const onMouseLeave = React.useCallback(() => {
    setActive(false);
    hoverTimeout.current = setTimeout(() => {
      setExpanded(false);
    }, collapseDelay);
  }, [collapseDelay, setExpanded, hoverTimeout]);

  const onBlur = React.useCallback(() => {
    focusTimeout.current = setTimeout(() => {
      setExpanded(false);
      setActive(false);
    }, 0);
  }, [focusTimeout, setExpanded]);

  const onFocus = React.useCallback(() => {
    if (focusTimeout.current) {
      clearTimeout(focusTimeout.current);
    }
  }, [focusTimeout]);

  const getArrowProps = () => ({
    "aria-hidden": true,
    ref: setArrowElement,
    style: arrowStyles({ attributes, styles }),
    sx: {
      display: "block",
      width: 12,
      height: 12,
      border: "inherit",
      background: "inherit",
      boxShadow: "inherit",
      clipPath: "path('M0,0 12,0 0,12 Z')",
    },
    ...attributes.arrow,
  });

  const getParentLinkProps = () => ({
    "aria-haspopup": true,
    "aria-expanded": isExpanded,
    onClick,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ref: setReferenceElement,
    style: styles.reference,
    ...attributes.reference,
  });

  const getChildMenuProps = () => ({
    "data-expanded": isExpanded,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    onFocus,
    ref: setPopperElement,
    hidden: !isExpanded,
    style: {
      opacity: isActive ? 1 : 0.75,
      ...styles.popper,
    },
    ...attributes.popper,
  });

  return { getParentLinkProps, getChildMenuProps, getArrowProps };
};

function arrowStyles({ attributes, styles }) {
  switch (attributes.popper?.["data-popper-placement"]) {
    case "top":
    case "top-start":
    case "top-end": {
      return {
        ...styles.arrow,
        transform: `${styles.arrow.transform} rotate(-135deg)`,
        bottom: -6,
      };
    }
    case "right":
    case "right-start":
    case "right-end": {
      return {
        ...styles.arrow,
        transform: `${styles.arrow.transform} rotate(-45deg)`,
        left: -6,
      };
    }
    case "bottom":
    case "bottom-start":
    case "bottom-end": {
      return {
        ...styles.arrow,
        transform: `${styles.arrow.transform} rotate(45deg)`,
        top: -6,
      };
    }
    case "left":
    case "left-start":
    case "left-end": {
      return {
        ...styles.arrow,
        transform: `${styles.arrow.transform} rotate(135deg)`,
        right: -6,
      };
    }
    default: {
      return styles.arrow;
    }
  }
}

export default useFlyoutMenuItem;

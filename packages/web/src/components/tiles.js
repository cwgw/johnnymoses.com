/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import uniqueId from "lodash/uniqueId";

import { useSelection } from '@zendeskgarden/container-selection'

import Button from './button'
import Icon from './icon'
import Box from './box'
import Flex from './flex'
import Label from './label'

const Tiles = ({ options, value: controlledValue, label, onChange, ...props }) => {
  const refs = React.useMemo(
    () => options ? options.map(() => React.createRef()) : [],
    [options]
  );

  const { getContainerProps, getItemProps } = useSelection({
    direction: 'both',
    selectedItem: controlledValue,
    onSelect: onChange,
  });

  const labelId = React.useRef(uniqueId("radiogroupLabel"));
  const id = React.useRef(uniqueId("radiogroup"));

  return (
    <Box {...props} >
      {label && (
        <div>
          <Label id={labelId.current} htmlFor={id.current} >
            {label}
            <span aria-hidden="true">{`: ${controlledValue}`}</span>
          </Label>
        </div>
      )}
      <Flex
        {...getContainerProps({ role: 'radiogroup' })}
        aria-labelledby={labelId.current}
        id={id.current}
        sx={{
          listStyle: 'none',
          mx: -1,
          my: 0,
          p: 0,
          display: 'flex',
          flexFlow: 'row wrap',
          "& > button": {
            mx: 1,
          },
        }}
      >
        {options && options.map(({icon, value}, i) => {
          const isChecked = controlledValue === value;
          return (
            <Button
              {...getItemProps({
                selectedAriaKey: 'aria-checked',
                role: 'radio',
                item: value,
                focusRef: refs[i],
              })}
              data-checked={isChecked}
              key={value}
              ref={refs[i]}
              variant="tile"
            >
              {icon && (
                <Icon variant="tile" icon={icon} />
              )}
              <span>
                {value}
              </span>
            </Button>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Tiles;

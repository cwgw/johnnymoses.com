/** @jsx jsx */
import { jsx } from "theme-ui";

import isNotDefaultOption from "../../utils/isNotDefaultOption";
import Listbox from "../listbox";
import Tiles from '../tiles';

const iconMap = {
  cd: 'Disc',
  dvd: 'Disc',
  download: 'Download',
}

const Options = ({ options, selectedOptions, onChange, ...props }) => {
  const handleChange = name => value => {
    onChange(name, value);
  };

  if (options.length === 1 && !isNotDefaultOption(options[0])) {
    return null;
  }

  return options.map((option, i) => {
    if (option.name === "Type") {
      return (
        <Tiles
          key={option.id}
          label={option.name}
          options={option.values.map(({ value }) => ({
            icon: iconMap[value.toLowerCase()],
            value
          }))}
          onChange={handleChange(option.name)}
          value={selectedOptions[i].value}
          {...props}
        />
      )
    }

    return (
      <Listbox
        key={option.id}
        label={option.name}
        options={option.values.map(({ value }) => value)}
        onChange={handleChange(option.name)}
        value={selectedOptions[i].value}
        {...props}
      />
    )
  });
};

export default Options;

/** @jsx jsx */
import { jsx } from "theme-ui";

import isNotDefaultOption from "../../utils/isNotDefaultOption";
import Listbox from "../listbox";

const Options = ({ options, selectedOptions, onChange }) => {
  const handleChange = name => value => {
    onChange(name, value);
  };

  if (options.length === 1 && !isNotDefaultOption(options[0])) {
    return null;
  }

  return options.map((option, i) => (
    <Listbox
      key={option.id}
      label={option.name}
      options={option.values.map(({ value }) => value)}
      onChange={handleChange(option.name)}
      value={selectedOptions[i].value}
    />
  ));
};

export default Options;

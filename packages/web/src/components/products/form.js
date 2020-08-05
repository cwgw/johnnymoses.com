/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import zipObject from "lodash/zipObject";
import snakeCase from "lodash/snakeCase";
import { navigate } from "gatsby";

import { useAddNotification } from "../../context/notifications";
// import useProductForm from "../../hooks/useProductForm";
import formatPrice from "../../utils/formatPrice";
import { isNotDefaultOption } from "../../utils/isNotDefaultOption";

import Box from "../box";
import Button from "../button";
import FormField from "../formField";

import Price from "./price";

const propTypes = {
  children: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.string),
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
  fields: ["price", "options", "quantity"],
};

const Form = ({ fields: _fields, children: _children, form, ...props }) => {
  const addNotification = useAddNotification();

  const { handleAddItemToCart } = form;

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      handleAddItemToCart().then(({ product, quantity }) => {
        addNotification({
          status: "success",
          message: `Added to cart: ${quantity} × ${product.title}`,
          actions: [["View cart", () => navigate("/cart")]],
        });
      });
    },
    [handleAddItemToCart, addNotification]
  );

  const fieldNames = (_fields || []).concat(["submit"]);
  const fields = renderFields(fieldNames, form);

  let children = fields;
  if (_children) {
    children = _children(zipObject(fieldNames, fields), form);
  }

  return (
    <Box as="form" onSubmit={handleSubmit} children={children} {...props} />
  );
};

function renderFields(
  fields,
  {
    variant,
    product,
    quantity,
    isAvailable,
    handleOptionChange,
    handleQuantityChange,
    status,
  }
) {
  return fields.map(field => {
    switch (field) {
      case "price": {
        return (
          <Price
            key="price"
            price={variant.priceV2}
            compareAtPrice={variant.compareAtPriceV2}
            showCurrency
          />
        );
      }
      case "options": {
        return (
          product.options &&
          product.options.map((option, i) => {
            if (isNotDefaultOption(option)) {
              return (
                <FormField
                  key={option.id}
                  type={option.name === "Type" ? "tiles" : "listbox"}
                  name={snakeCase(`option ${option.name}`)}
                  label={option.name}
                  options={option.values.map(({ value }) => value)}
                  onChange={v => handleOptionChange(option.name, v)}
                  value={variant.selectedOptions[i].value}
                />
              );
            }

            return null;
          })
        );
      }
      case "quantity": {
        return (
          <FormField
            key="quantity"
            type="counter"
            label="Quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        );
      }
      case "submit": {
        let value = `Add to cart - ${formatPrice(variant.priceV2, quantity)}`;

        if (status.adding) {
          value = "Adding…";
        }

        if (status.added) {
          value = "Added!";
        }

        return (
          <Button
            key="submit"
            type="submit"
            disabled={!isAvailable || status.adding}
            variant="submit"
          >
            {isAvailable ? (
              <span>{value}</span>
            ) : (
              <span>Currently out of stock</span>
            )}
          </Button>
        );
      }
      default: {
        return null;
      }
    }
  });
}

Form.propTypes = propTypes;

Form.defaultProps = defaultProps;

export default Form;

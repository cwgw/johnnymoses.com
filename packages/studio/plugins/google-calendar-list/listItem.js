import React from "react";
import PropTypes from 'prop-types';
import IntentButton from "part:@sanity/components/buttons/intent";
import Button from "part:@sanity/components/buttons/default";
import Badge from "part:@sanity/components/badges/default";
import Preview from "part:@sanity/components/previews/default";
import { Item as SanityItem } from "part:@sanity/components/lists/default";
import { formatDistanceToNow } from 'date-fns';

import styles from "./styles.css";

const { SANITY_STUDIO_APP_TOKEN } = process.env;

const propTypes = {
  displayProperties: PropTypes.array,
  item: PropTypes.object.isRequired,
}

const defaultProps = {
  displayProperties: [
    "resourceId",
    "channelId",
    "channelExpiration",
    "channelToken",
    "nextSyncToken",
  ]
}

const Item = ({ item, displayProperties }) => {

  const handleClick = React.useCallback(method => {
    let endpoint = "https://johnnymoses.netlify.app/.netlify/functions/calendar-notification-channel";
    if (window.location.hostname === "localhost") {
      endpoint = "http://localhost:8888/.netlify/functions/calendar-notification-channel";
    }
    
    const init = {
      method: "POST",
      headers: {
        "X-App-Token": SANITY_STUDIO_APP_TOKEN,
        "X-App-Method": method,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch(endpoint, init)
      .then(response => {
        console.log(response);
      })
      .catch(console.error);
  }, [item]);

  const isActive = !!item.channelExpiration
  const expirationDate = isActive && new Date(parseInt(item.channelExpiration, 10));
  const isExpired = isActive && expirationDate < new Date();
  const status = isExpired ? 'expired' : isActive ? 'active' : 'inactive';
  const statusColor = isExpired ? 'danger' : isActive ? 'success' : 'neutral';

  return (
    <SanityItem data-status={status}>
      <div className={styles.itemHeader}>
        <Preview
          title={item.calendarId}
          subtitle={isActive
            ? isExpired
              ? `Channel expired ${formatDistanceToNow(expirationDate)} ago`
              : `Channel expires in ${formatDistanceToNow(expirationDate)}`
            : `No associated notification channel`
          }
          status={<Badge color={statusColor}>{status}</Badge>}
          media={false}
        />
      </div>
      <pre className={styles.itemProperties}>
        <code>
          {displayProperties
            .map(prop => `${prop}: ${item[prop] || '---'}`)
            .join(`\n`)}
        </code>
      </pre>
      <div className={styles.itemActions}>
        <Button kind="secondary" onClick={() => handleClick('watch')} disabled={isActive && !isExpired}>
          {isActive ? 'Renew channel' : 'Create channel'}
        </Button>
        <Button kind="secondary" onClick={() => handleClick('stop')} disabled={!isActive || isExpired}>
          Kill channel
        </Button>
        <IntentButton
          intent="edit"
          kind="simple"
          params={{
            type: item._type,
            id: item._id
          }}
        >
          Edit Calendar
        </IntentButton>
      </div>
    </SanityItem>
  );
}

Item.propTypes = propTypes;

Item.defaultProps = defaultProps;

export default Item;

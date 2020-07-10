import React from "react";
import client from "part:@sanity/base/client";
import Button from "part:@sanity/components/buttons/default";
import { List, Item } from "part:@sanity/components/lists/default";

import styles from "./styles.css";

const appToken = process.env.SANITY_STUDIO_APP_TOKEN;

const Widget = ({ displayProperties }) => {
  const [calendars, setCalendars] = React.useState([]);

  React.useEffect(() => {
    const query = "*[_type==$type]";
    const params = { type: "calendar" };

    client.fetch(query, params).then(setCalendars).catch(console.error);

    const subscription = client.listen(query, params).subscribe(update => {
      setCalendars(update.result);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setCalendars]);

  const registerNotificationChannel = obj => {
    fetch(
      // "http://localhost:8888/.netlify/functions/calendar-notification-channel",
      "https://johnnymoses.netlify.app/.netlify/functions/calendar-notification-channel",
      {
        method: "POST",
        headers: {
          "X-App-Token": appToken,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.error);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Calendars</h2>
      </header>
      <div className={styles.content}>
        <List>
          {calendars.map(obj => (
            <Item key={obj._id}>
              <div>{obj.calendarId}</div>
              <pre>
                <code>
                  {displayProperties
                    .map(prop => `${prop}: ${obj[prop]}`)
                    .join(`\n`)}
                </code>
              </pre>

              <Button onClick={() => registerNotificationChannel(obj)}>
                Create notification channel
              </Button>
            </Item>
          ))}
        </List>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default {
  name: "google-calendar-list",
  component: Widget,
};

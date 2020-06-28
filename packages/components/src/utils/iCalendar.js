// const ICAL = require('ical.js');
import ICAL from "ical.js";

export const createIcsString = ({
  description = "",
  endDate,
  location = "",
  startDate,
  summary,
  updated,
  created,
  uid,
}) => {
  const component = new ICAL.Component("vcalendar");
  component.updatePropertyWithValue("prodid", "-//johnnymoses.com//ical.js");
  component.updatePropertyWithValue("version", "2.0");

  const vevent = new ICAL.Component("vevent");
  const timeStamp = new Date(updated || created).toISOString();
  vevent.updatePropertyWithValue("dtstamp", timeStamp);

  const event = new ICAL.Event(vevent);

  event.uid = uid;
  event.summary = summary;
  event.location = location;
  event.description =
    description.length > 75 - 12
      ? description.slice(0, 62) + "\u2026"
      : description;
  event.startDate =
    startDate.length > 10
      ? ICAL.Time.fromDateTimeString(startDate)
      : ICAL.Time.fromDateString(startDate);
  event.endDate =
    endDate.length > 10
      ? ICAL.Time.fromDateTimeString(endDate)
      : ICAL.Time.fromDateString(endDate);

  component.addSubcomponent(vevent);

  return component.toString();
};

export const createIcsDataUri = args => {
  const ics = createIcsString(args);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};

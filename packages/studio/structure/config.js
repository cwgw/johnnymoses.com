// import React from 'react'
import S from "@sanity/desk-tool/structure-builder";
// import Emoji from 'a11y-react-emoji'

// const ConfigIcon = () => <Emoji style={{ fontSize: '2rem' }} symbol='⚙️' />

export const ConfigMenu = S.listItem()
  .title("Configuration")
  // .icon(ConfigIcon)
  .child(
    S.list()
      .title("Settings")
      .items([
        S.documentListItem()
          .title("Global")
          .id("siteGlobal")
          .schemaType("siteGlobal"),
        S.listItem()
          .title("Menus")
          .child(
            S.documentTypeList("menu")
              .title("Menus")
              .filter("_type == $type")
              .params({ type: "menu" })
          ),
        S.listItem()
          .title("Forms")
          .child(
            S.documentTypeList("form")
              .title("Forms")
              .filter("_type == $type")
              .params({ type: "form" })
          ),
        S.listItem()
          .title("Calendars")
          .child(
            S.documentTypeList("calendar")
              .title("Calendars")
              .filter("_type == $type")
              .params({ type: "calendar" })
          ),
      ])
  );

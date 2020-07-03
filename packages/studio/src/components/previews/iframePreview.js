import React from 'react'

import styles from './iframePreview.css'

const assembleProjectUrl = ({displayed, draft, options}) => {
  const {content: {main: {slug}}} = displayed
  const {previewURL} = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', {slug, previewURL})
    return ''
  }
  const id = draft ? draft._id : document._id;
  const rev = draft ? draft._rev : document._rev;
  return `${previewURL}/${id}/${rev}`
}

const IframePreview = ({ document, options }) => {
  const { displayed, draft } = document;

  const url = React.useMemo(
    () => assembleProjectUrl({displayed, draft, options}),
    [displayed, draft, options]
  );
  
  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}

export default IframePreview;

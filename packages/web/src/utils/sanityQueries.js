import { pageBlockSchemas } from '@johnnymoses.com/studio'

const pageBlockQueries = Object.entries(pageBlockSchemas)
  .reduce((acc, [name, obj]) => {
    const fields = createQueryFragment(obj.fields);
    if (fields) {
      acc.push(`_type == "${name}" => { ..., ${fields} }`)
    }
    return acc;
  }, [])
  .join(', ');

export const pageQuery = `{
  ...,
  content {
    ...,
    main {
      ...,
      modules[] {
        ...,
        ${pageBlockQueries}
      }
    }
  }
}`;

function createQueryFragment(field) {  
  if (Array.isArray(field)) {
    let fields = field.map(createQueryFragment).filter(Boolean);
    return fields.length > 0 ? fields.join(", ") : '';
  }

  if (field.type === 'reference') {
    return `${field.name}->`
  }

  if (field.type === 'array') {
    if (field.of.some(e => e.type === 'reference')) {
      return `${field.name}[]->`
    }
  }

  if (pageBlockSchemas[field.type]) {
    const block = pageBlockSchemas[field.type];
    const nestedFields = createQueryFragment(block.fields)
    if (nestedFields) {
      return `${field.name} { ..., ${nestedFields} }`
    }
  }

  if (field.type === 'image') {
    return `image { ..., asset-> }`;
  }

  return;
}

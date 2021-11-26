// import the default document actions
import defaultResolve from 'part:@sanity/base/document-actions';

export default function resolveDocumentActions(props) {
  if (props.type === 'site-config') {
    // Only show Publish button if document is of the type site-config
    return [...defaultResolve(props).filter(props => props.name === 'PublishAction')];
  }
  // Show default actions on documents
  return defaultResolve(props);
}

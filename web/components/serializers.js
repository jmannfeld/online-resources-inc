import BlockContent from '@sanity/block-content-to-react';
import EmbedHTML from './EmbedHTML';
import Figure from './Figure';
import Cta from './Cta';
import styles from './serializers.module.css';

const serializers = {
  types: {
    embedHTML: EmbedHTML,
    figure: Figure,
    cta: Cta,
    block: (props) => {
      if (props.node.style === 'blockquote') {
        return <h2 className={styles.customBlockquote}>{props.children}</h2>;
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props);
    }
  }
};

export default serializers;

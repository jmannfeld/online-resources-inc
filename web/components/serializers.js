import EmbedHTML from './EmbedHTML';
import Figure from './Figure';
import styles from './serializers.module.css';

const serializers = {
  types: {
    embedHTML: EmbedHTML,
    figure: Figure,
    block: (props) => {
      if (props.node.style === 'blockquote') {
        return <h2 className={styles.customBlockquote}>{props.children}</h2>;
      }
      return <p>{props.children}</p>;
    }
  }
};

export default serializers;

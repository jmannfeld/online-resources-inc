import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';

class AdminPage extends React.Component {
  static propTypes = {
    config: PropTypes.object
  };

  render() {
    const { config } = this.props;
    return <Layout config={config}></Layout>;
  }
}

export default AdminPage;

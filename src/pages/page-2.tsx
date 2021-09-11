import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout';

class SecondPage extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Layout>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default SecondPage;

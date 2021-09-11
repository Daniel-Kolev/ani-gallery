import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from '../components/Header';
import './layout.scss';

interface LayoutProps {
  className?: string;
  children: JSX.Element[];
}

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data: StaticQueryProps) => {
          const { siteMetadata } = data.site;
          const { children } = this.props;

          return (
            <>
              <Helmet
                title={siteMetadata.title}
                meta={[
                  {
                    name: 'description',
                    content: 'Gatsby TypeScript Boilerplate Starter',
                  },
                  { name: 'keywords', content: 'Gatsby, TypeScript, Starter' },
                ]}
              >
                <html lang="en" />
              </Helmet>
              <Header siteTitle={siteMetadata.title} />
              <div
                style={{
                  margin: '0 auto',
                  maxWidth: 960,
                  padding: '0px 1.0875rem 1.45rem',
                  paddingTop: 0,
                }}
              >
                {children}
              </div>
            </>
          );
        }}
      />
    );
  }
}

export default Layout;

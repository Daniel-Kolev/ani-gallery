import React from "react";

import Canvas from "../components/three/canvas";
import Layout from "../components/main/layout/layout";
import SEO from "../components/main/seo/seo";

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO title="Home" />
    <div id="scene-container" style={{ height: "100vh", width: "100%" }}>
      <Canvas />
    </div>
  </Layout>
);

export default IndexPage;

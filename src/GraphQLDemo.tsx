import * as React from "react";
import axios from "axios";

import graphqldemotoken from "./graphdemotoken";

interface IViewer {
  name: string;
  avatarUrl: string;
}

interface IQueryResult {
  data: {
    viewer: IViewer;
  };
}

const GraphQLDemo: React.SFC = () => {
  const [viewer, setViewer]: [
    IViewer,
    (viewer: IViewer) => void
  ] = React.useState({
    name: "",
    avatarUrl: ""
  });

  React.useEffect(() => {
    axios.post<IQueryResult>("https://api.github.com/graphql", {
      query: `query {
        viewer {
          name
          avatarUrl
        }
      }`
    }, {
      headers: {
        Authorization: `bearer ${graphqldemotoken}`
      }
    })
    .then(response => {
      setViewer(response.data.data.viewer);
    })
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img src={viewer.avatarUrl} className="avatar" />
        <div className="viewer">{viewer.name}</div>
        <h1>Github Search</h1>
      </div>
    </div>
  );
};

export default GraphQLDemo;

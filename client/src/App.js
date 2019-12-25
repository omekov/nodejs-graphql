import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Astronauts from "./components/Astronauts";
import Countries from "./components/Countries";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:3030/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Astronauts />
        <Countries />
      </div>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackgroun.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

// Determine GraphQL endpoint (Vite exposes import.meta.env.DEV boolean in dev mode)
const GRAPHQL_URI = import.meta.env.DEV
  ? "http://localhost:4000/graphql"
  : "/graphql"; // In production the backend serves the frontend and /graphql proxy

// Apollo Client v3.13+/3.14 requires providing an HttpLink instead of legacy uri/credentials shortcuts
const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  credentials: "include", // send session cookie
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // cache query results
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>
);

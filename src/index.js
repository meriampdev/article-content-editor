import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import './index.css';
import './tooltip.css';
import App from './App';
import { Preview } from "components/Preview"
import { MobileView } from "./MobileView"
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { EditorProvider } from "context/editor"

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api2.stg.skettt.com/graphql"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={apolloClient}>
        <EditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/mobile" element={<MobileView />} />
              <Route path="preview/:topicId" element={<Preview />} />
            </Routes>
          </BrowserRouter>
        </EditorProvider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

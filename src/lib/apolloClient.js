import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

const client = new ApolloClient({
  link: new BatchHttpLink({
    uri: 'https://spacex-production.up.railway.app', // Replace with your actual GraphQL endpoint
    credentials: 'same-origin', // Or 'include' if needed
  }),
  cache: new InMemoryCache(),
});

export default client;
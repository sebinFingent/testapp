'use client'

import React from 'react';
import {
  gql,
  useQuery,
} from '@apollo/client';

const GET_PEOPLE = gql`
query ExampleQuery {
    company {
      ceo
      cto
    }
    roadster {
      apoapsis_au
    }
  }
`;

const GET_FILMS = gql`
query ExampleQuery {
    company {
      ceo
    }
    roadster {
      apoapsis_au
    }
  }
`;

const GET_PLANETS = gql`
query ExampleQuery {
    company {
      ceo
      employees
    }
    roadster {
      apoapsis_au
    }
  }
`;

const GET_STARSHIPS = gql`
query ExampleQuery {
    company {
      ceo
      founded
    }
    roadster {
      apoapsis_au
    }
  }
`;

function People() {
  const { data, loading } = useQuery(GET_PEOPLE);
  return <div>👤 People: {loading ? 'Loading...' : data?.company?.ceo || ''}</div>;
}

function Films() {
  const { data, loading } = useQuery(GET_FILMS);
  return <div>🎬 Film: {loading ? 'Loading...' : data?.roadster?.apoapsis_au || ''}</div>;
}

function Planets() {
  const { data, loading } = useQuery(GET_PLANETS);
  return <div>🪐 Planet: {loading ? 'Loading...' : data?.company?.employees || ''}</div>;
}

function Starships() {
  const { data, loading } = useQuery(GET_STARSHIPS);
  return <div>🚀 Starship: {loading ? 'Loading...' : data?.company?.founded || ''}</div>;
}

function App() {
  return (
    <div className="p-4 space-y-2">
        <h1 className="text-xl font-bold">🚀 Apollo Batching Example</h1>
        <People />
        <Films />
        <Planets />
        <Starships />
    </div>
  );
}

export default App;
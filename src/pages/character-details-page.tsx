import React from "react";
import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

import { GetCharaterDetailsQuery } from "../__generated__/graphql";
import CharacterCard from "../components/character-card";

export const GET_CHARACTER_DETAILS: TypedDocumentNode<GetCharaterDetailsQuery> = gql`
  query GetCharaterDetails($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        image
        status
        species
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;

const CharactersDetailsPage: React.FC = () => {
  let { name } = useParams();

  const {
    loading,
    error,
    data = {},
  } = useQuery<GetCharaterDetailsQuery>(GET_CHARACTER_DETAILS, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid container spacing={2}>
        {data?.characters?.results?.map((character) => (
          <Grid key={character?.name} item xs={4}>
            <CharacterCard character={character as any} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CharactersDetailsPage;

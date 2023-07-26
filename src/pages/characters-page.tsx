import React from "react";
import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { GetCharatersQuery } from "../__generated__/graphql";
import CharacterCard from "../components/character-card";

export const GET_CHARACTERS: TypedDocumentNode<GetCharatersQuery> = gql`
  query GetCharaters {
    characters {
      results {
        name
        image
        status
        species
        location {
          name
        }
      }
    }
  }
`;

const CharactersPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  let navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // navigate to details page
  const handleOnDetailsClick = (name: string) => {
    navigate(`/details/${name}`);
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid container spacing={2}>
        {data?.characters?.results?.map((character) => (
          <Grid key={character?.name} item xs={4}>
            <CharacterCard
              character={character as any}
              onDetailsClick={handleOnDetailsClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CharactersPage;

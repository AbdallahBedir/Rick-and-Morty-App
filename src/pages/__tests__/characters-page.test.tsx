import React from "react";

import { GraphQLError } from "graphql";

import { renderApollo, screen, cleanup } from "../../test-utils";
import CharactersPage, { GET_CHARACTERS } from "../characters-page";

const mockCharacters = {
  characters: {
    results: [
      {
        image: "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
        location: { name: "Earth (Replacement Dimension)" },
        name: "Albert Einstein",
        origin: { name: "Earth (C-137)" },
        species: "Human",
        status: "Dead",
      },
    ],
  },
};

describe("Characters Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("renders without error", async () => {
    const mocks = [
      {
        request: { query: GET_CHARACTERS },
        result: { data: mockCharacters },
      },
    ];

    renderApollo(<CharactersPage />, { mocks });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Albert Einstein")).toBeInTheDocument();
    expect(await screen.findByText("Dead - Human")).toBeInTheDocument();
  });

  it("should show network error UI", async () => {
    const mocks = [
      {
        request: { query: GET_CHARACTERS },
        error: new Error("An error occurred"),
      },
    ];

    renderApollo(<CharactersPage />, { mocks });

    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument(); // substring match
  });

  it("should show GraphQL error UI", async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTERS,
        },
        result: {
          errors: [new GraphQLError("Error!")],
        },
      },
    ];

    renderApollo(<CharactersPage />, { mocks });

    expect(await screen.findByText(/Error!/)).toBeInTheDocument(); // substring match
  });
});

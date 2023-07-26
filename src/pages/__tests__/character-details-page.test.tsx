import React from "react";
import { GraphQLError } from "graphql";

import { renderApollo, screen, cleanup } from "../../test-utils";
import CharactersDetailsPage, {
  GET_CHARACTER_DETAILS,
} from "../character-details-page";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    name: "Albert Einstein",
  }),
}));

describe("Character Details Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("renders without error", async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTER_DETAILS,
          variables: { name: "Albert Einstein" },
        },
        result: { data: mockCharacters },
      },
    ];

    renderApollo(<CharactersDetailsPage />, { mocks });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Albert Einstein")).toBeInTheDocument();
    expect(await screen.findByText("Dead - Human")).toBeInTheDocument();
    expect(await screen.findByText("Earth (C-137)")).toBeInTheDocument();
  });

  it("should show network error UI", async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTER_DETAILS,
          variables: { name: "Albert Einstein" },
        },
        error: new Error("An error occurred"),
      },
    ];

    renderApollo(<CharactersDetailsPage />, { mocks });

    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument(); // substring match
  });

  it("should show GraphQL error UI", async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTER_DETAILS,
          variables: { name: "Albert Einstein" },
        },
        result: {
          errors: [new GraphQLError("Error!")],
        },
      },
    ];

    renderApollo(<CharactersDetailsPage />, { mocks });

    expect(await screen.findByText(/Error!/)).toBeInTheDocument(); // substring match
  });
});

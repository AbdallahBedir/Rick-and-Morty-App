import React from "react";

import { render, cleanup, screen, fireEvent } from "../../test-utils";
import { getCharacterStatusColor } from "../../utils/get-character-status-color";

import CharacterCard from "../character-card";

describe("Character Card", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  const mockOnDetailsClick = jest.fn();

  it("renders without error", async () => {
    render(
      <CharacterCard
        character={{
          image: "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
          location: { name: "Earth (Replacement Dimension)" } as any,
          name: "Albert Einstein",
          origin: { name: "Earth (C-137)" } as any,
          species: "Human",
          status: "Dead",
        }}
        onDetailsClick={mockOnDetailsClick}
      />
    );

    // it shows character details correctly
    expect(await screen.findByText("Albert Einstein")).toBeInTheDocument();
    expect(await screen.findByText("Dead - Human")).toBeInTheDocument();
    expect(
      await screen.findByText("Earth (Replacement Dimension)")
    ).toBeInTheDocument();
    expect(await screen.findByText("Earth (C-137)")).toBeInTheDocument();

    // when click on learn more button, `onDetailsClick` fn gets called with character name
    const learnMoreButton = screen.getByRole("button", { name: /Learn More/ });

    fireEvent.click(learnMoreButton);

    expect(mockOnDetailsClick).toHaveBeenCalledWith("Albert Einstein");
  });

  it("getCharacterStatusColor() fn returns status color correctly", async () => {
    const aliveColor = getCharacterStatusColor("Alive");
    const deadColor = getCharacterStatusColor("Dead");
    const unknownColor = getCharacterStatusColor("Unknown");

    expect(aliveColor).toBe("#55cc44");
    expect(deadColor).toBe("#f13d2e");
    expect(unknownColor).toBe("#9e9e9e");
  });
});

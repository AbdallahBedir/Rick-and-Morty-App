// returns the color of character status
export const getCharacterStatusColor = (status: string | null) => {
  if (status === "Alive") return "#55cc44";
  if (status === "Dead") return "#f13d2e";
  return "#9e9e9e";
};

import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { Character } from "../__generated__/graphql";
import { getCharacterStatusColor } from "../utils/get-character-status-color";

interface CharacterCardProps {
  character: Partial<Character>; // character information
  onDetailsClick?(name: string): void; // event when clicked to get character details
}

function CharacterCard({ character, onDetailsClick }: CharacterCardProps) {
  const {
    name = "",
    image = "",
    location,
    origin,
    status = "",
    species = "",
  } = character;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image as any}
        title={name as any}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FiberManualRecordIcon
            sx={{
              color: getCharacterStatusColor(status),
              fontSize: "14px",
              marginRight: "5px",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {`${status} - ${species}`}
          </Typography>
        </Box>

        {location && (
          <Box sx={{ m: 1 }}>
            <Typography variant="body1" color="text.primary">
              Last known location:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {location.name}
            </Typography>
          </Box>
        )}

        {origin && (
          <Box sx={{ m: 1 }}>
            <Typography variant="body1" color="text.primary">
              First seen in:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {origin?.name}
            </Typography>
          </Box>
        )}

        {/* `onDetailsClick` will be passed from characters page list only to get character details*/}
        {onDetailsClick && (
          <CardActions disableSpacing={true} sx={{ pl: 0 }}>
            <Button size="small" onClick={() => onDetailsClick(name || "")}>
              Learn More
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
}

export default CharacterCard;

import { CSSProperties } from "@material-ui/core/styles/withStyles";

export function spaceChildren(direction: "horizontally" | "vertically", spaceSize: string | number): CSSProperties {
  let relevantMargin;
  switch (direction) {
    case "horizontally":
      relevantMargin = "marginRight";
      break;
    case "vertically":
      relevantMargin = "marginBottom";
      break;
  }

  return {
    "& > *:not(:last-child)": {
      [relevantMargin]: spaceSize,
    },
  };
}

export const flexCol: CSSProperties = { display: "flex", flexDirection: "column" };
export const flexColCentered: CSSProperties = { ...flexCol, alignItems: "center" };

import { CSSProperties } from "@material-ui/core/styles/withStyles";

export function spaceChildren(direction: "vertically" | "horizontally", spaceSize: string | number): CSSProperties {
  let relevantMargin;
  switch (direction) {
    case "vertically":
      relevantMargin = "marginBottom";
      break;
    case "horizontally":
      relevantMargin = "marginRight";
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

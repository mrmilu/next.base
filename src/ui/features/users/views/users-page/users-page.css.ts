import { px2rem, wrapperStyles } from "@/src/ui/styles/utils.css";
import { spacing } from "@/src/ui/styles/spacing";
import { style } from "@vanilla-extract/css";

const wrapper = style([
  wrapperStyles,
  {
    display: "flex",
    flexDirection: "column",
    padding: px2rem(spacing.size4),
    gap: px2rem(spacing.size6)
  }
]);

const classes = {
  wrapper
};

export default classes;

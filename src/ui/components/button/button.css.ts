import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { vars } from "@/src/ui/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

const button = recipe({
  base: {
    borderRadius: px2rem(16),
    border: "none",
    padding: `${px2rem(spacing.size2)} ${px2rem(spacing.size4)}`,
    color: vars.colors.white,
    cursor: "pointer"
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: vars.colors.gray20,
        ":hover": { backgroundColor: vars.colors.gray20 },
        ":focus": { backgroundColor: vars.colors.gray20 }
      },
      false: {
        backgroundColor: vars.colors.gray90,
        ":hover": { backgroundColor: vars.colors.gray70 },
        ":focus": { backgroundColor: vars.colors.gray70 }
      }
    }
  },
  defaultVariants: {
    disabled: false
  }
});

const classes = {
  button
};

export default classes;

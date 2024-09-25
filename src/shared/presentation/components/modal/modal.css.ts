import { px2rem } from "@/src/shared/presentation/styles/utils.css";
import { style } from "@vanilla-extract/css";
import { vars } from "@/src/shared/presentation/styles/theme.css";

const wrapper = style({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgb(0 0 0 / 20%)",
  width: "100%",
  height: "100%",
  zIndex: "9"
});

const modalContent = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: "900",
  minHeight: px2rem(100),
  padding: px2rem(16),
  backgroundColor: vars.colors.white,
  pointerEvents: "all",
  maxWidth: "700px"
});

const closeBtn = style({
  alignSelf: "flex-end"
});

const classes = {
  wrapper,
  modalContent,
  closeBtn
};

export default classes;

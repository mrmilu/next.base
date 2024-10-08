"use client";
import css from "./main-loader.css";
import { easings, useTransition, animated } from "@react-spring/web";
import { useUiProvider } from "@/src/shared/presentation/providers/ui.provider";
import { Loader } from "@/src/shared/presentation/components/loader/loader";

export const MainLoader = () => {
  const showLoader = useUiProvider((state) => state.showLoader);
  const showModalTransition = useTransition(showLoader, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: showLoader,
    config: {
      duration: 450,
      easing: easings.easeOutQuart
    }
  });

  return showModalTransition(
    (styles, item) =>
      item && (
        <animated.div style={styles} className={css.wrapper}>
          <Loader />
        </animated.div>
      )
  );
};

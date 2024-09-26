import css from "./loader-block.css";
import { Loader } from "@/src/shared/presentation/components/loader/loader";

export function LoaderBlock() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}

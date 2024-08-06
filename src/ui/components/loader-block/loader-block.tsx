import css from "./loader-block.css";
import { Loader } from "@/src/ui/components/loader/loader";

export function LoaderBlock() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}

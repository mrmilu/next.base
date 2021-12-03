import styles from "./my_main_loader.module.scss";
import { getLoaderState } from "@/src/ui/state/ui.slice";
import { useAppSelector } from "@/src/ui/state";
import { MyLoader } from "@/src/ui/components/my_loader/my_loader";

export const MyMainLoader = () => {
  const showLoader = useAppSelector(getLoaderState);

  return showLoader ? (
    <div className={styles["my-main-loader"]}>
      <MyLoader />
    </div>
  ) : (
    <></>
  );
};

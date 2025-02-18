import { ColorEnum } from "@prisma/client";
import styles from "./style.module.scss";

type Props = React.PropsWithChildren<{
  variant: ColorEnum | "negative";
}>;

export default function Pill({ variant, children }: Props) {
  return (
    <div
      className={styles["pill"]}
      style={{
        backgroundColor:
          variant === "negative"
            ? "var(--red-600)"
            : `var(--animal-${variant.toLowerCase()})`,
        border:
          variant === 'White'
            ? '2px solid var(--border)'
            : undefined,
        color:
          variant === 'White'
            ? 'var(--black)'
            : 'var(--white)',
      }}
    >
      {children}
    </div>
  );
}

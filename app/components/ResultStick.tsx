import { FC, memo } from "react";
import { CheckResult } from "../types/monitor";

export const ResultStick: FC<{ item: CheckResult }> = memo(({ item }) => {
  const isUp = item.status === "up";

  return (
    <div
      className={`h-full w-full rounded-xs transition-all duration-150 cursor-pointer origin-bottom hover:scale-y-125
        ${isUp ? "bg-emerald-500 hover:bg-emerald-400" : "bg-rose-500 hover:bg-rose-400"}
      `}
    />
  );
});

ResultStick.displayName = "ResultStick";

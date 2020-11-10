import { Result } from "https://github.com/alejandroq/typescriptx/raw/main/result.ts";

type Light = Green | Yellow | Red;

type Green = {
  color: "green";
  next: Yellow;
};

type Yellow = {
  color: "yellow";
  next: Red;
};

type Red = {
  color: "red";
  next: Green;
};

export const next = (
  light: Light,
  next: Light,
): Result<Pick<Light, "next">, Error> =>
  (light.next.color === next.color)
    ? {
      type: "value",
      value: next,
    }
    : {
      type: "error",
      error: {
        name: "unable to transition",
        message: `cannot transition from ${light.color} to ${next.color}`,
      },
    };

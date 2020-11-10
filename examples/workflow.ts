import { Result } from "https://raw.githubusercontent.com/alejandroq/typescriptx/main/result.ts";

type Content = {
  content: string;
};

type Stages = (Draft | Review | Published | Archived);

type Draft = {
  stage: "draft";
  next: ["review"];
} & Content;

type Review = {
  stage: "review";
  next: ["published", "draft"];
} & Content;

type Published = {
  stage: "published";
  next: ["archived", "draft"];
} & Content;

type Archived = {
  stage: "archived";
  next: ["archived"];
} & Content;

export const next = (
  curr: Stages,
  next: Stages,
): Result<Pick<Stages, "next">, Error> =>
  ((<string[]>curr.next).includes(next.stage))
    ? {
      type: "value",
      value: next,
    }
    : {
      type: "error",
      error: {
        name: "unable to transition",
        message: `cannot transition from ${curr.stage} to ${next.stage}`,
      },
    };

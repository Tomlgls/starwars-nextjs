import { atom } from "jotai";
import { z } from "zod";

const CommentsScheme = z.record(
  z.array(
    z.object({
      id: z.string(),
      comment: z.string(),
    })
  )
);

type Comments = z.infer<typeof CommentsScheme>;

const defaultComments = atom<Comments>({});

export { defaultComments };
export type { Comments };

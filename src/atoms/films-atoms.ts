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

const commentsAtom = atom<Comments>({});

export { commentsAtom };
export type { Comments };

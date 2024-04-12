import { z } from "zod";

const FilmScheme = z.object({
  release_date: z.string(),
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  planets: z.array(z.string()).optional(),
  url: z.string(),
});

const FilmsScheme = z.array(FilmScheme);

const FilmsResponseScheme = z.object({
  count: z.number(),
  next: z.string().optional().nullish(),
  previous: z.string().optional().nullish(),
  results: FilmsScheme.optional(),
});

type Film = z.infer<typeof FilmScheme>;
type Films = z.infer<typeof FilmsScheme>;
type FilmsResponse = z.infer<typeof FilmsResponseScheme>;

export { FilmScheme, FilmsResponseScheme, FilmsScheme };

export type { Film, Films, FilmsResponse };

import { z } from "zod";

const PlanetScheme = z.object({
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  films: z.array(z.string()).optional(),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

const PlanetsScheme = z.array(PlanetScheme);

const PlanetsResponseScheme = z.object({
  count: z.number(),
  next: z.string().optional().nullish(),
  previous: z.string().optional().nullish(),
  results: PlanetsScheme.optional(),
});

type Planet = z.infer<typeof PlanetScheme>;
type Planets = z.infer<typeof PlanetsScheme>;
type PlanetsResponse = z.infer<typeof PlanetsResponseScheme>;

export { PlanetScheme, PlanetsResponseScheme, PlanetsScheme };

export type { Planet, Planets, PlanetsResponse };

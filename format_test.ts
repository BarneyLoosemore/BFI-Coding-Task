import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts";
import { format } from "./format.ts";

const TEST_SOURCE = {
  "Brad Pitt": ["cast", "Once Upon a Time...in Hollywood"],
  "Quentin Tarantino": ["director", "Once Upon a Time...in Hollywood"],
  "Leonardo DiCaprio": ["cast", "Once Upon a Time...in Hollywood"],
  "Ray Liotta": ["cast", "Goodfellas"],
  "Martin Scorsese": ["director", "Goodfellas"],
} as const;

Deno.test(
  "`format` takes an object with a list of actors/directors with corresponding films and formats it into a list of films with the corresponding actors/directors",
  () => {
    const formattedSource = format(TEST_SOURCE);
    assertEquals(formattedSource, {
      "Once Upon a Time...in Hollywood": {
        cast: ["Brad Pitt", "Leonardo DiCaprio"],
        director: ["Quentin Tarantino"],
      },
      Goodfellas: {
        cast: ["Ray Liotta"],
        director: ["Martin Scorsese"],
      },
    });
  }
);

Deno.test(
  "`format` returns an empty object instead of erroring if empty list provided",
  () => {
    // @ts-ignore
    const formattedSource = format([]);
    assertEquals(formattedSource, {});
  }
);

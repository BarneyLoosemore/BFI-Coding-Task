type Source<TPerson extends string, TFilm extends string> = Record<
  TPerson,
  readonly ["cast" | "director", TFilm]
>;
type Output<TPerson extends string, TFilm extends string> = Record<
  TFilm,
  Record<"cast" | "director", TPerson[]>
>;

export const format = <TPerson extends string, TFilm extends string>(
  source: Source<TPerson, TFilm>
): Output<TPerson, TFilm> => {
  const people = Object.entries(source) as [
    TPerson,
    ["cast" | "director", TFilm]
  ][];

  return people.reduce((films, [person, [role, film]]) => {
    if (film in films) {
      const currentFilm = films[film];
      return {
        ...films,
        [film]: {
          ...currentFilm,
          [role]: [...(currentFilm[role] ?? []), person],
        },
      };
    }
    return {
      ...films,
      [film]: {
        [role]: [person],
      },
    };
  }, {} as Output<TPerson, TFilm>);
};

// uncomment the below and run `deno run format.ts` from the command line
// const input = JSON.parse(await Deno.readTextFile("source.json")) as Source<
//   string,
//   string
// >;
// console.log(format(input));

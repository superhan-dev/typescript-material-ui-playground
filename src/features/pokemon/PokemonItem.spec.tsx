import { rest } from "msw";
import { screen } from "@testing-library/react";

import { PokemonItem } from "./PokemonItem";
import { server } from "../../test/server";
import { renderWithProviders } from "../../test/test-utils";

describe("Pokemon", () => {
  it("handles good response", async () => {
    renderWithProviders(<PokemonItem />);
    screen.getByText("Loading...");

    await screen.findByRole("heading", { name: /bulbasaur/i });

    const img = screen.getByRole("img", { name: /bulbasaur/i }) as HTMLElement;

    expect(img.src).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
    );
  });

  // it("handles error response", async () => {
  //   // force msw to return error response
  //   server.use(
  //     rest.get(
  //       "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  //       (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       }
  //     )
  //   );

  //   renderWithProviders(<PokemonItem />);

  //   screen.getByText("Loading...");

  //   await screen.findByText("Oh no, there was an error");
  // });
});

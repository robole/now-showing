/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import MovieListSort from "../../../src/components/MovieListSort.svelte";

describe("MovieListSort", () => {
  test("should show a sort dropdown", () => {
    render(MovieListSort);
    expect(screen.getByRole("combobox", { name: "Sort" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Rating (highest first)" })
    ).toBeInTheDocument();
		expect(
      screen.getByRole("option", { name: "Duration (longest first)" })
    ).toBeInTheDocument();
  });
});

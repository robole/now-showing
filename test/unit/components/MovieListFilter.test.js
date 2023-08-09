/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import MovieListFilter from "../../../src/components/MovieListFilter.svelte";

describe("MovieListFilter", () => {
  test("should show a filter disclosure widget", () => {
    render(MovieListFilter);
    expect(screen.getByText("Filter")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Reveal filters" }));
  });

	test("should reveal filter fields when the 'Reveal filters' button is clicked", async () => {
    render(MovieListFilter);

    await userEvent.click(screen.getByRole("button", { name: "Reveal filters" }));
    setTimeout(() => {
      expect(screen.getByText("Rating")).toBeInTheDocument();
			expect(screen.getByLabelText("Min")).toBeInTheDocument();
    }, 500);
	});
});

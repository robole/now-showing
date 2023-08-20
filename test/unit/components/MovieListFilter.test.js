/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import MovieListFilter from "../../../src/components/MovieListFilter.svelte";

describe("MovieListFilter", () => {
  test("should show a filter disclosure widget", () => {
    render(MovieListFilter, { minRating: 0, maxRating : 10, minDuration: 0, maxDuration:300, minVotes: 0, maxVotes :999999, fromDate: "2023-01-01", toDate: "2023-08-20"});
   
		expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
  });

	test("should reveal filter fields when the 'Reveal filters' button is clicked", async () => {
		render(MovieListFilter, { minRating: 0, maxRating : 10, minDuration: 0, maxDuration:300, minVotes: 0, maxVotes :999999, fromDate: "2023-01-01", toDate: "2023-08-20"});

    await userEvent.click(screen.getByRole("button", { name: "Filter" }));
    setTimeout(() => {
      expect(screen.getByText("Rating")).toBeInTheDocument();
			expect(screen.getByLabelText("Min")).toBeInTheDocument();
    }, 500);
	});
});

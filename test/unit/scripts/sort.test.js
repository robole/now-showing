import { sortMovies, sort } from "../../../src/scripts/sort";

describe("sort", () => {
  const movies = [
    {
      release_date: "2021-09-15",
      title: "Dune",
      runtime: 155,
    },
    {
      release_date: "2021-09-22",
      title: "The Many Saints of Newark",
      runtime: 120,
    },
    {
      release_date: "2021-09-01",
      title: "Shang-Chi and the Legend of the Ten Rings",
      runtime: 150,
    },
  ];

  test("should sort movies by release date with the most recent first (descending order)", () => {
    let sorted = sortMovies(movies, "release_date", "desc");

    expect(sorted[0].title).toEqual("The Many Saints of Newark");
    expect(sorted[1].title).toEqual("Dune");
    expect(sorted[2].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
  });

	test("should sort movies by release date with the least recent first (ascending order)", () => {
    let sorted = sortMovies(movies, "release_date", "asc");

		expect(sorted[0].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[1].title).toEqual("Dune");
		expect(sorted[2].title).toEqual("The Many Saints of Newark");
    
  });

  test("should sort movies by runtime with the longest first (descending order)", () => {
    let sorted = sortMovies(movies, "runtime", "desc");

    expect(sorted[0].title).toEqual("Dune");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[2].title).toEqual("The Many Saints of Newark");
  });

	test("should sort movies by runtime with the shortest first (ascending order)", () => {
    let sorted = sortMovies(movies, "runtime", "asc");

		expect(sorted[0].title).toEqual("The Many Saints of Newark");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
		expect(sorted[2].title).toEqual("Dune");
    
  });

  test("should sort a text field in ascending order", () => {
    let sorted = sort(movies, "title", "asc");

    expect(sorted[0].title).toEqual("Dune");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[2].title).toEqual("The Many Saints of Newark");
  });

	test("should sort a text field in descending order", () => {
    let sorted = sort(movies, "title", "desc");

		expect(sorted[0].title).toEqual("The Many Saints of Newark");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
		expect(sorted[2].title).toEqual("Dune");
   
  });
});

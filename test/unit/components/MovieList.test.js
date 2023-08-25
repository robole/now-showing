/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import MovieList from "../../../src/components/MovieList.svelte";

describe("MovieList", () => {
  const movies = [
    {
      id: 1,
      title: "Dune",
      overview: "Long description here",
      releaseDate: "2021-09-15",
      tagline: "Something catchy",
      runtime: 150,
      rating: 8,
			release_dates: {
				results: [
					{
						"iso_3166_1": "TR",
						"release_dates": [
							{
								"certification": "16+",
								"descriptors": [
									"Violence / Horror"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "GB",
						"release_dates": [
							{
								"certification": "15",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "CA",
						"release_dates": [
							{
								"certification": "14A",
								"descriptors": [
									"Frightening Scenes"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							},
							{
								"certification": "14A",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-08-01T00:00:00.000Z",
								"type": 4
							}
						]
					},
					{
						"iso_3166_1": "NO",
						"release_dates": [
							{
								"certification": "15",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "CZ",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "EE",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "PL",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "BE",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "LT",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "DK",
						"release_dates": [
							{
								"certification": "15",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "NL",
						"release_dates": [
							{
								"certification": "16",
								"descriptors": [
									"Fear"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "KH",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "KW",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "KZ",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "IE",
						"release_dates": [
							{
								"certification": "16",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "GR",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "EC",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "IT",
						"release_dates": [
							{
								"certification": "14+",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "PT",
						"release_dates": [
							{
								"certification": "M/16",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "BH",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "HK",
						"release_dates": [
							{
								"certification": "IIB",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 2
							},
							{
								"certification": "IIB",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-13T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "ID",
						"release_dates": [
							{
								"certification": "13+",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-12T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "MX",
						"release_dates": [
							{
								"certification": "B",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "AU",
						"release_dates": [
							{
								"certification": "M",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "IL",
						"release_dates": [
							{
								"certification": "14",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "FR",
						"release_dates": [
							{
								"certification": "12",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "PH",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "TW",
						"release_dates": [
							{
								"certification": "12+",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-14T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "KR",
						"release_dates": [
							{
								"certification": "15",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-19T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "FI",
						"release_dates": [
							{
								"certification": "K-16",
								"descriptors": [
									"may cause anxiety"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "DE",
						"release_dates": [
							{
								"certification": "16",
								"descriptors": [
									"Stressful Scenes",
									"Injury"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "AE",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "IS",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-05T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "AR",
						"release_dates": [
							{
								"certification": "+13",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "UA",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "AZ",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "PR",
						"release_dates": [
							{
								"certification": "PG-13",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-08-01T00:00:00.000Z",
								"type": 4
							}
						]
					},
					{
						"iso_3166_1": "RO",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "IN",
						"release_dates": [
							{
								"certification": "A",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "US",
						"release_dates": [
							{
								"certification": "PG-13",
								"descriptors": [],
								"iso_639_1": "",
								"note": "New York City, New York",
								"release_date": "2023-06-27T00:00:00.000Z",
								"type": 1
							},
							{
								"certification": "PG-13",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							},
							{
								"certification": "PG-13",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-08-01T00:00:00.000Z",
								"type": 4
							}
						]
					},
					{
						"iso_3166_1": "PE",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "ES",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-20T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "BR",
						"release_dates": [
							{
								"certification": "12",
								"descriptors": [
									"Fear"
								],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "HU",
						"release_dates": [
							{
								"certification": "",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-06T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "SE",
						"release_dates": [
							{
								"certification": "15",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-07T00:00:00.000Z",
								"type": 3
							}
						]
					},
					{
						"iso_3166_1": "SG",
						"release_dates": [
							{
								"certification": "NC16",
								"descriptors": [],
								"iso_639_1": "",
								"note": "",
								"release_date": "2023-07-12T00:00:00.000Z",
								"type": 3
							}
						]
					}
				]
		},
      ratingCount: 5500,
      videos: {
        results: [
          {
            key: "JORN2hkXLyM",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
          {
            key: "X2m-08cOAbc",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Free Guy",
      overview: "Long description",
      releaseDate: "2021-09-10",
      tagline: "Catchphrase",
      certification: "PG",
      ratingCount: 2560000,
      rating: 6,
		  release_dates: {
					results: [
						{
							"iso_3166_1": "TR",
							"release_dates": [
								{
									"certification": "16+",
									"descriptors": [
										"Violence / Horror"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "GB",
							"release_dates": [
								{
									"certification": "15",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "CA",
							"release_dates": [
								{
									"certification": "14A",
									"descriptors": [
										"Frightening Scenes"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								},
								{
									"certification": "14A",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-08-01T00:00:00.000Z",
									"type": 4
								}
							]
						},
						{
							"iso_3166_1": "NO",
							"release_dates": [
								{
									"certification": "15",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "CZ",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "EE",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "PL",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "BE",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "LT",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "DK",
							"release_dates": [
								{
									"certification": "15",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "NL",
							"release_dates": [
								{
									"certification": "16",
									"descriptors": [
										"Fear"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "KH",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "KW",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "KZ",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "IE",
							"release_dates": [
								{
									"certification": "16",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "GR",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "EC",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "IT",
							"release_dates": [
								{
									"certification": "14+",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "PT",
							"release_dates": [
								{
									"certification": "M/16",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "BH",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "HK",
							"release_dates": [
								{
									"certification": "IIB",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 2
								},
								{
									"certification": "IIB",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-13T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "ID",
							"release_dates": [
								{
									"certification": "13+",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-12T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "MX",
							"release_dates": [
								{
									"certification": "B",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "AU",
							"release_dates": [
								{
									"certification": "M",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "IL",
							"release_dates": [
								{
									"certification": "14",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "FR",
							"release_dates": [
								{
									"certification": "12",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "PH",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "TW",
							"release_dates": [
								{
									"certification": "12+",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-14T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "KR",
							"release_dates": [
								{
									"certification": "15",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-19T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "FI",
							"release_dates": [
								{
									"certification": "K-16",
									"descriptors": [
										"may cause anxiety"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "DE",
							"release_dates": [
								{
									"certification": "16",
									"descriptors": [
										"Stressful Scenes",
										"Injury"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "AE",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "IS",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-05T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "AR",
							"release_dates": [
								{
									"certification": "+13",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "UA",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "AZ",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "PR",
							"release_dates": [
								{
									"certification": "PG-13",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-08-01T00:00:00.000Z",
									"type": 4
								}
							]
						},
						{
							"iso_3166_1": "RO",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "IN",
							"release_dates": [
								{
									"certification": "A",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "US",
							"release_dates": [
								{
									"certification": "PG-13",
									"descriptors": [],
									"iso_639_1": "",
									"note": "New York City, New York",
									"release_date": "2023-06-27T00:00:00.000Z",
									"type": 1
								},
								{
									"certification": "PG-13",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								},
								{
									"certification": "PG-13",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-08-01T00:00:00.000Z",
									"type": 4
								}
							]
						},
						{
							"iso_3166_1": "PE",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "ES",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-20T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "BR",
							"release_dates": [
								{
									"certification": "12",
									"descriptors": [
										"Fear"
									],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "HU",
							"release_dates": [
								{
									"certification": "",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-06T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "SE",
							"release_dates": [
								{
									"certification": "15",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-07T00:00:00.000Z",
									"type": 3
								}
							]
						},
						{
							"iso_3166_1": "SG",
							"release_dates": [
								{
									"certification": "NC16",
									"descriptors": [],
									"iso_639_1": "",
									"note": "",
									"release_date": "2023-07-12T00:00:00.000Z",
									"type": 3
								}
							]
						}
					]
			},
      videos: {
        results: [
          {
            key: "JORN2hkXLyM",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
          {
            key: "X2m-08cOAbc",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
        ],
      },
    },
  ];

  test("renders as a list", () => {
    render(MovieList);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  test("shows a list of movies", () => {
    render(MovieList, { movies, country: "IE" } );

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(2);
    expect(screen.queryByText("Dune")).toBeInTheDocument();
    expect(screen.queryByText("Free Guy")).toBeInTheDocument();
  });

  test("shows a filtered list of movies", () => {
    movies[0].show = false;
    movies[1].show = true;

    render(MovieList, { movies, country: "IE" } );

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(1);
    expect(screen.queryByText("Dune")).not.toBeInTheDocument();
    expect(screen.queryByText("Free Guy")).toBeInTheDocument();

    movies[0].show = true;
  });
});

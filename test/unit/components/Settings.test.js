/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import Settings from "../../../src/components/Settings.svelte";

describe("Settings", () => {
  test("should render", () => {
    render(Settings, {selectedCountryCode : "IE", selectedLanguageCode : "EN", languages: [], countries: []});
    expect(screen.getByText("Regional settings")).toBeInTheDocument();
  });

  test("should show a form", () => {
		let countries = [{"iso_3166_1":"AD","english_name":"Andorra","native_name":"Andorra"},{"iso_3166_1":"AE","english_name":"United Arab Emirates","native_name":"United Arab Emirates"}];
		let languages= [{"iso_639_1":"af","english_name":"Afrikaans","name":"Afrikaans"},{"iso_639_1":"ak","english_name":"Akan","name":""}];
		 
		render(Settings, {selectedCountryCode : "IE", selectedLanguageCode : "EN", languages, countries});

    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});

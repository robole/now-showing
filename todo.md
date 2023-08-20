# Todo

## Improvements

1. Remove calls to `dialog.show()`? It is breaking the test!
1. Extract controls out of VideoPlayer as separate component?
1. Prevent scrolling when dialog is visible - `overscroll-behavior` does not work as expected!
1. Add e2e test. What is the demarcation between unit and e2e?

## Bugs

1. When new movies are added to array by hitting "View More", filters are not applied.

## Additional features

1. A dedicated view to show the trailers of all of the movies would be cool! Too much work?
1. Show times for the local cinemas. Is there free data available somewhere?
1. Add compact view?
1. Get user country location from edge handler? <https://docs.netlify.com/edge-handlers/api-overview/#geolocation>

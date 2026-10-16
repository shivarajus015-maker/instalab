# InstaLab — GitHub Pages repair package

## Files
- `index.html` — website entry point
- `styles.css` — page styling
- `app.js` — repaired JavaScript and interactive page behavior

## Upload to GitHub
1. Open your repository: https://github.com/shivarajus015-maker/instalab
2. Open the repository's main/root folder.
3. Choose **Add file → Upload files**.
4. Upload these three files together: `index.html`, `styles.css`, and `app.js`.
5. If GitHub asks whether to replace existing files, review the changes and confirm the replacement.
6. Enter a commit message such as `Repair InstaLab website files`, then choose **Commit changes**.
7. Wait a minute, then refresh https://shivarajus015-maker.github.io/instalab/

## Important findings
- The uploaded JavaScript stopped halfway through the Kannada biography for M. S. Swaminathan, causing a JavaScript syntax error. The package closes the record and restores the missing application code.
- The HTML already referenced `styles.css` and `app.js`, so the files are named to match those references.
- The restored UI supports navigation, language selection, search, equipment/scientist cards, simulation controls, and the quiz questions present in the source.
- The source did not contain the complete science-facts or grade-wise curriculum datasets, and its scientist list was cut off. Those sections show a notice instead of pretending that missing information is complete. There are 12 simulation records and 12 equipment records in the uploaded JavaScript.
- JavaScript syntax was checked with Node.js. This is not a substitute for testing every interaction in a real browser.

## Safety
Use only low-voltage battery models for electricity lessons. Never experiment with household mains electricity.

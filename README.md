# The Propertist

A website where you can browse property listings — search by location, filter by
number of bedrooms (BHK) or Buy/Rent, sort by price, and click into a property
to see more details.

## How to run it

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser.

## What it does

- Shows a list of properties with a photo, price, location, and BHK
- Search box to find properties by location or name, with a brief pause after
  you stop typing so it doesn't re-search on every keystroke
- Filters for number of bedrooms and Buy/Rent
- Sort properties by price, low to high or high to low
- A "Clear filters" button to reset your search back to everything
- Your search and filters are saved in the page's web address, so you can copy
  the link and share it, or bookmark it, and it'll remember what you searched for
- Click a property to see its full details, with a friendly "not found" page
  if you land on a listing that doesn't exist
- A loading animation shows briefly while the listings load
- Works on both desktop and mobile

Built with Next.js and Tailwind CSS. The property data is sample/mock data, not real listings.

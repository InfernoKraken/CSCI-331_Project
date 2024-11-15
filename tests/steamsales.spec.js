// Imports for Playwright and file writing
import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

// The runable test that actually just scrapes data
test('scrape deals.gg', async ({ page }) => {
  await page.goto('https://gg.deals/deals/steam-deals/');

  // Instantiate variables that hold the data points we want. (Using generic XPaths incase of DOM change)
  const gameNames = await page.locator("//div[@data-game-name]//a[contains(@class, 'game-info-title')]").allTextContents(); // This '.allTextContents' method makes these consts into arrays!
  const gameOldPrices = await page.locator("//div[@data-game-name]//span[contains(@class, 'price-old')]").allTextContents();
  const gameNewPrices = await page.locator("//div[@data-game-name]//span[contains(@class, 'game-price-new')]").allTextContents();
  const gameLinks = await page.locator("a.shop-link").evaluateAll(links => links.map(link => link.href));

  // Make an output variable that holds the data that will be written to the .txt file
  let output = '';
  for (let i = 0; i < gameNames.length; i++) {
    // Print every data point, formatted nicely. (Link is using Markdown)
    output += `The game "${gameNames[i]}" was ${gameOldPrices[i]}, but is now ${gameNewPrices[i]}! (Buy [here](${gameLinks[i]}))\n\n`;
  }

  // Write the data to the file (Overwrites existing file).
  writeFileSync('game_deals.txt', output);

  // Playwright handles browser and file closure automatically, so we're done!
});




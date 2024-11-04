import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://store.steampowered.com');

  await page.locator("//div[@class='home_page_content special_offers']//a[contains(., 'Browse More')]").click();

  let stuff = await page.locator("(//div[contains(@class, 'SaleSectionForCustomCSS')])[3]//div[@class='ImpressionTrackedElement']").textContent();
  console.log(test);
  
  for (let i = 0; i < 12; i++) {

    // Click the Next button
    await page.locator("//div[contains(@class, 'contenthubmaincarousel')]//button[contains(@class, 'CarouselBtnRight')]").click();

    // Retrieve and log the game name
    const name = await page.locator("(//div[contains(@class, 'TagBox')]/../..//div[contains(., 'Release date:')]/a)[2]").textContent();
    console.log(name);

    // Retrieve and log the price
    const price = await page.locator("(//div[@class='ContentHubMainCarouselCapsule']//div[contains(@class, 'CapsuleBottomBar')])[2]").textContent();
    console.log(price);
    
  }



//   // Expect a title "to contain" a substring.
//   //await expect(page).toHaveTitle(/Steam/);
//   await expect(page.locator("//div[contains(@class, 'sale_item_browser')]//div[@class='ImpressionTrackedElement']")).toBeVisible();
});
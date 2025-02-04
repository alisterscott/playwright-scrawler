import { test, expect } from '@playwright/test';

test('can get all links on a page', async ({ page }, testInfo) => {
  const url = 'https://www.ptv.vic.gov.au/'
  await page.goto(url);

  let pageLinks = await page.$$eval('a', (anchors) => anchors.map((a) => a.href))
  // sort the pagelinks and remove all duplicates
  pageLinks = pageLinks.sort().filter((item, pos, ary) => !pos || item != ary[pos - 1]);
  // remove any links that don't begin with the url
  pageLinks = pageLinks.filter(link => link.startsWith(url))
  
  // console.log(pageLinks)
  // iterate through the pageLinks array
  for (let i = 0; i < pageLinks.length; i++) {
    const link = pageLinks[i];
    await test.step(`test step for ${link}`, async () => {
      test.info().annotations.push({ type: 'url', description: `testing ${link}` });
      const screenshot = await page.screenshot();
      await testInfo.attach(link, { body: screenshot, contentType: 'image/png' });  
    })
  }
});



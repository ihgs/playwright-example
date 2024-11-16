import { test , expect } from '@playwright/test';

test('visualization test', async ({ page }) => {
    await page.goto('https://ihgs.github.io/mylink/#');
    await expect(page).toHaveScreenshot('test2-before.png');
    await page.getByText('New').click();

    await page.getByPlaceholder('Ttile').fill('Goog1e');

    await page.getByPlaceholder('Link').fill('https://google.com');
    await page.getByPlaceholder('category').fill('検索');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('#root')).toContainText('検索');
    await expect(page).toHaveScreenshot('test2-after.png');
})
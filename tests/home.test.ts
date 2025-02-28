import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:3002";

test("Home page loads correctly", async ({ page }) => {
  await page.goto(baseURL);

  await expect(page).toHaveTitle(/Devs Learning/);

  const link = await page.locator('a[href="/technologies/"]').nth(0);
  await expect(link).toBeVisible();
});

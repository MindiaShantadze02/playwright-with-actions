import { test, expect, Page } from '@playwright/test';
import config from "../config/env.json"
import Login from '../pom/Login';
import ProductListingPage from '../pom/ProductListingPage';
import loginData from "../testdata/login.json";

test('Verify valid user', async ({ page, context }) => {
  await page.goto(config.dev, { waitUntil: "networkidle" });
  const newPage: Page = await context.newPage();
  await newPage.goto('https://playwright.dev/');
  const loginPage: Login = new Login(page);

  await loginPage.enterUser(loginData.validUser);
  await loginPage.enterPassword(loginData.password);
  await loginPage.btnLoginPage.click();
  
  await newPage.close();
  const productListingPage: ProductListingPage = new ProductListingPage(page);
  const count: number = await productListingPage.divInventoryItem.count();
  await page.screenshot({ path: "screenshots/screenshot.png" })
  expect(count).toBe(6);
  await expect(productListingPage.divInventoryItem.nth(0)).toBeVisible();
})
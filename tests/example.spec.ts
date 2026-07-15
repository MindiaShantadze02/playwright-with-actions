import { test, expect, Page } from "@playwright/test";
import config from "../config/env.json";
import Login from "../pom/Login";
import ProductListingPage from "../pom/ProductListingPage";
import loginData from "../testdata/login.json";

test.describe("Test suite", () => {
  test(
    "Verify valid user",
    { tag: "@regression" },
    async ({ page, context }) => {
      await page.goto(config.dev, { waitUntil: "networkidle" });
      const newPage: Page = await context.newPage();
      await newPage.goto("https://playwright.dev/");
      const loginPage: Login = new Login(page);

      await loginPage.enterUser(loginData.validUser);
      await loginPage.enterPassword(loginData.password);
      await loginPage.btnLoginPage.click();

      await newPage.close();
      const productListingPage: ProductListingPage = new ProductListingPage(
        page
      );
      const count: number = await productListingPage.divInventoryItem.count();
      await page.screenshot({ path: "screenshots/screenshot.png" });
      expect(count).toBe(6);
      expect(productListingPage.divInventoryItem.nth(0)).toBeVisible();
    }
  );

  test("Smoke demo", { tag: "@smoke" }, async () => {
    expect(1 + 1).toBe(2);
  });

  test("Smoke 2 demo", { tag: "@smoke" }, async ({ page }) => {
    await page.route(/\.css(\?.*)/, async (route) => {
      await route.abort();
    })
    
    await page.goto(config.dev, { waitUntil: 'load' });
    await page.screenshot({ path: "screenshots/screenshot2.png" });
    expect(5 + 5).toBe(10);
  });

  test("Regression demo", { tag: "@regression" }, async () => {
    expect(1 + 2).toBe(3);
  });

  test("Regression 2 demo", { tag: "@regression" }, () => {
    expect(2 + 2).toBe(4);
  });

  test("Regression 3 demo", { tag: "@regression" }, () => {
    expect(2 + 3).toBe(5);
  });
});

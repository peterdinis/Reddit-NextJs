import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Visiting now page", () => {
    test("Test visit page for now subreddits", async() => {
        return;
    })
})


test.describe("Visit popular page", () => {
    test("Test trying to visit page /r/popular", () => {
        return;
    })
})
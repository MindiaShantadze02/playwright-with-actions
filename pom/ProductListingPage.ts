import { Locator, Page } from "@playwright/test"

class ProductListingPage {
    private page: Page;
    readonly divInventoryItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.divInventoryItem = this.page.locator('.inventory_item')
    }
}

export default ProductListingPage;
import { Locator, Page } from "@playwright/test"

class Login {
    private page: Page;
    readonly loginLogo: Locator;
    readonly userInput: Locator;
    readonly passwordInput: Locator;
    readonly btnLoginPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLogo = this.page.locator('.login_logo')
        this.userInput = this.page.locator("#user-name")
        this.passwordInput = this.page.locator("#password")
        this.btnLoginPage = this.page.locator("#login-button");
    }

    public async enterUser (userName: string): Promise<void> {
        await this.userInput.fill(userName)
    }

    public async enterPassword (password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }
}

export default Login;
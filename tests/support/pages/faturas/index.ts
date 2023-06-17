import { Locator, Page, expect } from "@playwright/test";
import { FaturaModel } from "../../../fixtures/fatura.model";

export class FaturaPage {
 
    readonly page: Page;
    readonly inputFaturaName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputFaturaName = page.locator('input[class*=fatura]');
    }

    //Ações
    async go() {
        await this.page.goto('/');
    }

    async create(fatura: FaturaModel) {
        await this.inputFaturaName.fill(fatura.name);
        await this.page.click('css=button >> text=Create');
    }

    async toggle(faturaName: string) {
        const target = this.page.locator(`xpath=//p[text()="${faturaName}"]/..//button[contains(@class, "Toggle")]`);
        await target.click();
    }

    async remove(faturaName: string) {
        const target = this.page.locator(`xpath=//p[text()="${faturaName}"]/..//button[contains(@class, "Delete")]`);
        await target.click();
    }

    //Validações
    async shouldHaveText(faturaName: string) {
        const target = this.page.locator(`css=.task-item p >> text='${faturaName}`);
        await expect(target).toBeVisible();
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal@-html-container');
        await expect(target).toHaveText(text);
    }

    async shouldBeDone(fatunaName: string) {
        const target = this.page.getByText(fatunaName);
        await expect(target).toHaveCSS('text-decoration-line', 'line-through');
    }

    async shouldNotExist(faturaName: string) {
        const target = this.page.locator(`css=.task-item p >> text='${faturaName}`);
        await expect(target).not.toBeVisible();
    }
}
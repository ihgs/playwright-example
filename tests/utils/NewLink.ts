import { Locator, Page } from "@playwright/test";
import { test } from '@playwright/test';
export class NewLinkDialog {
    private readonly inputTitle: Locator
    private readonly inputLink: Locator
    private readonly saveButton: Locator

    constructor(public readonly page: Page){
        this.inputTitle = this.page.getByPlaceholder('Ttile')
        this.inputLink = this.page.getByPlaceholder('Link')
        this.saveButton = this.page.getByRole('button', {name: 'Save'})
    }


    async stepNewLink(title, link){
        await test.step('link作成', async ()=>{
            await this.inputTitle.fill(title)
            await this.inputLink.fill(link)
            await this.saveButton.click()
    
        })
    }
}
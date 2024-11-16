import { test as base, expect } from '@playwright/test';
import { NewLinkDialog } from './utils/NewLink';


const test = base.extend<{ myFixture: string }>({
    myFixture: [async ({ }, use) => {
        console.log('before')
        await use('hello')
        console.log('after')
    }, {}]
})

const step = test.step

test.describe('myLink ', () => {
    test('Linkを作成する。stepをつかって', async ({ myFixture, page }) => {
        console.log(myFixture)
        await test.step('トップページを表示', async () => {
            await page.goto('https://ihgs.github.io/mylink/#');
        })
        await test.step('Linkを作成する', async () => {
            await page.getByText('New').click();

            await page.getByPlaceholder('Ttile').fill('Google');

            await page.getByPlaceholder('Link').fill('https://google.com');
            await page.getByPlaceholder('category').fill('検索');
            await page.getByRole('button', { name: 'Save' }).click();

        })
        await test.step('必要な情報が表示されていること', async () => {
            await expect(page.locator('#root')).toContainText('検索');
            await expect(page.getByRole('link')).toContainText('Google');
        })
    })

    test('Classを使って、Linkを作成する。', async ({ page }) => {
        await test.step('トップページを表示', async () => {
            await page.goto('https://ihgs.github.io/mylink/#');
        })
        await page.getByText('New').click();
        const newDialog = new NewLinkDialog(page)
        await newDialog.stepNewLink('Google', 'https://google.com');

        await test.step('必要な情報が表示されていること', async () => {
            // await expect(page.locator('#root')).toContainText('検索');
            await expect(page.getByRole('link')).toContainText('Google');
        })


    })


    test('Dotenvを使って、Linkを作成する。', async ({ page }) => {
        await test.step('トップページを表示', async () => {
            await page.goto('https://ihgs.github.io/mylink/#');
        })
        await page.getByText('New').click();
        const newDialog = new NewLinkDialog(page)
        await newDialog.stepNewLink(process.env.TITLE, 'https://google.com');

        await test.step('必要な情報が表示されていること', async () => {
            // `TARGET=stg npm run test` と実行した場合、.env.stg が読み込まれるためエラー
            await expect(page.getByRole('link')).toContainText('DotEnvTitle');
        })


    })


    test('upload file test', async ({ page }) => {
        await page.goto('https://ihgs.github.io/mylink/#data');
        await page.locator(".file-input").click();
        await page.locator(".file-input").setInputFiles('testdata/mylink.data');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('img').click();

        // ボタンクリックなどでページ遷移があるとmobile でうまく動かない (view portのせい？)
        await Promise.all([
            page.getByRole('link', { name: 'Home' }).click(),
            page.waitForNavigation()
        ])

        await page.locator('div').filter({ hasText: /^No category$/ }).first();
        await expect(page.getByRole('link', { name: 'MyGoogleFromData' })).toContainText('MyGoogleFromData');


    })

    test.fail('カテゴリ入れ替えテスト', async () => {
        await step('ログイン', async () => { })
        await step('テストページに遷移', async () => { })
        await step('ログイン', async () => { })
        await step('ログイン', async () => { })
        await step('ログイン', async () => { })
        await step('ログイン', async () => { })
    })
})
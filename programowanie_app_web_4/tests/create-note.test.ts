import * as puppeteer from 'puppeteer';


describe('e2e test', () => {
    let page: puppeteer.Page;
    let browser: puppeteer.Browser;
    let noteCount: number = 0;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
     
        await page.goto("http://localhost:8080/");
        await page.waitForSelector("#add-button");
        await page.waitForSelector(".note");
        noteCount = await page.evaluate(() => { 
            return document.querySelectorAll(".note").length ?? 0;
        });
        await page.click("#add-button");
        await page.waitForSelector("#add-note-wrapper");
        await page.type("#title", "Sample note name");
        await page.type("#content", "Sample note content");
        await page.select("#color", "#7D2E68");
        await page.waitForSelector("#submit-new-note");
        

        let selector = 'button#submit-new-note';
        await page.evaluate((selector) => document.querySelector(selector).click(), selector); 
        await page.click("button#note-form-close");
    });


    it("Did note has been created sucessfully?", async () => {
        await page.waitForSelector("#notes-wrapper .note");

        let newNoteCount = await page.evaluate(() => {
            let allNotes = document.querySelectorAll(".note");
            return allNotes.length ?? 0;
        });

        await expect(newNoteCount).toBe(noteCount);
    });

    afterAll(async () => { 
        await page.screenshot({path: 'tests/screen.png'});;
        await browser.close()
     })
});
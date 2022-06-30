const puppeteer = require('puppeteer');

describe('This should try to modify html', () => {
    test('correct url is called', async () =>
    {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('file:///D:/Users/Mario%20Villalvazo/Documents/GitHub/litegui.js/examples/puppeteerTest.html');
        const divRef: HTMLElement = await page.evaluate((sel: any) => {
            return document.querySelector(sel);
        }, '#staticDiv');

        await page.screenshot({path: 'puppeteerTest.png', fullPage: true});

        if (divRef.innerHTML == 'Hola hola')
        {
            console.log("divRef: " + divRef);
        }
        else
        {
            console.log('No es lo mismo');
            console.log('Inner: ' + divRef.innerHTML);
            console.log('Text: ' + divRef.innerText);
        }
        
        divRef.innerHTML = 'Hola puppeteado';

        await page.screenshot({path: 'puppeteerTest2.png', fullPage: true});
        await page.close();
        await browser.close();
        expect(divRef).toBeDefined();
    });
});
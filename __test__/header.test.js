const puppeteer = require('puppeteer');
const Session = require('./lib/session');
const userFactory = require('./lib/user');

let browser, page;
// test('Adds two numbers', () => {
//     const sum = 1 + 2;
//     expect(sum).toEqual(3);
// })

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
})

afterEach(async () => {
    await browser.close();
})

//console.log("sdf")
test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
})

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    console.log(url)
    expect(url).toMatch(/accounts\.google\.com/);
})

test('When signed in, shows logout button', async () => {
    // const id ='5d03cd041c3fc71292a88ce3'; //from my MongoDB
    const user = await userFactory();
    const { session, sig } = Session(user);

    await page.setCookie({name: "session", value: session})
    await page.setCookie({name: "session.sig", value: sig})
    console.log(session, sig);
    await page.goto('localhost:3000');
    await page.waitFor('a[href="/auth/logout"]');
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
})
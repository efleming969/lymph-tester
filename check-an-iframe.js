import Puppeteer from "puppeteer";

const headless = false;
const devtools = true;

Puppeteer.launch( { headless, devtools } ).then( async function( browser ) {
    const [ page ] = await browser.pages();

    await page.goto( "http://localhost:3000/RadioUI" );
    await page.screenshot( { path: "./screenshot.png" } );

    const iframe = await page.$( "iframe" );
    const contentFrame = await iframe.contentFrame();

    await contentFrame.type( "input[name=number]", "100" );
    await page.screenshot( { path: "./screenshot.png" } );

    await browser.close();
} );

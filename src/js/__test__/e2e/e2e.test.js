import { exportAllDeclaration } from "@babel/types";
import puppetteer from "puppeteer";

jest.setTimeout(60000); // default puppeteer timeout
describe("test", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:8888";

  beforeAll(async () => {
    browser = await puppetteer.launch();
      /*{//во всем виновата безголовость
      headless: false,
      slowMo: 100,
      devtools: true,
    });*/
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Открытие страницы", async () => {
    await page.goto(baseUrl);
  });

  test("validate-button onClick", async () => {
    await page.goto(baseUrl);

    const button = await page.$(".validate-button");
    button.click().catch(e => e);
    await page.waitForSelector(".modal-active");
  });
  // как переписать тест, чтобы возвращалось корректное значение ".modal__description" ?
  // судя по всему. я его получаю уже после закрытия браузера(

  /* test("isValid cardNumber", async () => {
    await page.goto(baseUrl);
    const input = await page.$(".input-card-number");
	await input.type("4111111111111111");
			   
    const button = await page.$(".validate-button");
    button.click();
	
	const result = await page.evaluate(() => 

	 document.querySelector(".modal__description").innerText);

    expect(result).toEqual("is Valid");
  }); */
});

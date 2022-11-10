import { Request, Response } from "express";
import { Controller, Get, Post } from "../../../../system/src/core/decorator";
import { PdfConverterService } from "./PdfConverter.service";
import puppeteer from "puppeteer";

@Controller("/converter/html2pdf")
export class PdfConverterController {
  //
  @Post()
  async create(req: Request, res: Response) {}

  @Get()
  async findAll(req: Request, res: Response) {
    const url = req.query.url.toString();

    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.emulateMediaType("screen");

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
    });

    (await page.createPDFStream())
      .on("data", function (data) {
        stream.write(data);
      })
      .on("end", async function () {
        stream.end();
        // Close the browser instance
        await browser.close();
      });
  }
}

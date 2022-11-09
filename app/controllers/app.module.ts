import { Module } from "../../system/src/core/decorator";
import { ExampleController } from "./example/example.controller";
import { PdfConverterController } from "./Pdf/PdfConverter/PdfConverter.controller";

@Module({
  controllers: [ExampleController, PdfConverterController],
})
export class AppModule {}

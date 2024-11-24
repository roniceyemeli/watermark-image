const Jimp = require("jimp");

const addWatermark = async () => {
  try {
    Jimp.decoders["image/jpeg"].maxMemoryUsageInMB = 512; //memory management
    const inputImage = "test.png";
    const outputImage = "output.png";

    const image = await Jimp.read(inputImage);

    // Load the font (try constant or manually provide the path)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

    // Add the watermark text
    image.print(
      font,
      0,
      0,
      {
        text: "Confidential",
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      image.bitmap.width, // Text  width
      image.bitmap.height // Text height
    );

    image.opacity(0.5);

    // Save the output image
    await image.writeAsync(outputImage);

    console.log("Watermark added successfully!");
  } catch (err) {
    console.error("Error adding watermark:", err);
  }
};

addWatermark();

const { createCanvas, loadImage, createImageData } = require('canvas')
const path = require("path");
const fs = require("fs");

let inputTexturePath = "./test.png"

let reSizeConfig = [
    [20, 20],
    [29, 29],
    [40, 40],
    [58, 58],
    [60, 60],
    [72, 72],
    [80, 80],
    [87, 87],
    [120, 120],
    [180, 180],
    [512, 512],
    [1024, 1024],
]

let outputPath = "./output"

if (!fs.existsSync(outputPath)) {
    console.log('文件夹不存在', outputPath);
    fs.mkdirSync(outputPath)
}


async function main() {
    const myimg = await loadImage(inputTexturePath)
    console.log("myimg ", myimg)
    for (let i = 0; i < reSizeConfig.length; i++) {
        let arr = reSizeConfig[i]
        let picWidth = arr[0];
        let picHeight = arr[1];
        let canvas = createCanvas(picWidth, picHeight)
        let ctx = canvas.getContext('2d')
        ctx.drawImage(myimg, 0, 0, myimg.width, myimg.height, 0, 0, picWidth, picHeight)
        let buf2 = canvas.toBuffer('image/png', { compressionLevel: 6, filters: canvas.PNG_FILTER_NONE })
        let fileName = picWidth + "X" + picHeight + ".png"
        let filePath = path.join(outputPath, fileName)
        fs.writeFileSync(filePath, buf2)
        console.log("Generate ", filePath)
    }
}



main();
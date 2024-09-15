import ffmpeg from 'fluent-ffmpeg'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// Function to download the image
async function downloadImage(imageUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath)
    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

export default downloadImage
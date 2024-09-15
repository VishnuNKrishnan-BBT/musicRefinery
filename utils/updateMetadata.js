import ffmpeg from 'fluent-ffmpeg'
import checkWritePermission from './checkWritePermission.js'
import fs from 'fs'
import getAlbumArt from './getAlbumArt.js'

function updateMetaData(originalPath, newPath, metadata = {}, incPassCount, incFailCount) {
    // checkWritePermission(originalPath)

    getAlbumArt(metadata.title, metadata.album)
        .then(() => {
            console.log(`-- Updating metadata...`)
            // Update metadata using FFmpeg
            ffmpeg(originalPath)
                .input(`./assets/${metadata.title}.jpg`)  // Use the downloaded album art
                .outputOption('-map', '0:a')  // Map the audio stream from the input
                .outputOption('-map', '1')    // Map the image (album art)
                .outputOption('-c:a', 'copy') // Copy the audio stream without re-encoding
                .outputOption('-c:v', 'mjpeg') // Encode the album art as MJPEG
                .outputOption('-metadata:s:v', 'title=Album cover')  // Metadata for the cover
                .outputOption('-metadata:s:v', 'comment=Cover (front)') // Metadata comment for the cover
                .outputOption('-metadata', `title=${metadata.title}`)   // Add title metadata
                .outputOption('-metadata', `artist=${metadata.artists}`) // Add artist metadata
                .outputOption('-metadata', `album=${metadata.album}`)    // Add album metadata
                .outputOption('-metadata', `year=${metadata.releaseDate}`) // Add year metadata
                .outputOption('-metadata', `genre=${metadata.genres}`)   // Add genre metadata
                .output(newPath)  // Specify the output file
                .on('end', () => {
                    fs.unlink(`./assets/${metadata.title}.jpg`, () => {
                        null
                    })
                    incPassCount()
                })
                .on('error', (err) => {
                    fs.unlink(`./assets/${metadata.title}.jpg`, () => {
                        null
                    })
                    incFailCount()
                    console.error('-- Error updating metadata:', err)
                })
                .run() // Make sure to call `.run()` to execute the FFmpeg command
        })
}

export default updateMetaData
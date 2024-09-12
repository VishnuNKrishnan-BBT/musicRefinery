import ffmpeg from 'fluent-ffmpeg'

// Function to trim the audio file to 10 seconds
function trimAudio(filePath, outputFilePath, duration = 20) {
    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .setStartTime(0) // Start from the beginning
            .setDuration(duration) // Trim to <duration> seconds
            .output(outputFilePath)
            .on('end', () => resolve(outputFilePath))
            .on('error', err => reject(err))
            .run()
    })
}

export default trimAudio
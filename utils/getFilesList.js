import fs from 'fs'
import path from 'path'

function getFilesInFolder(folderPath) {
    console.log('-- Finding files...')
    return new Promise((resolve, reject) => {
        // Read the contents of the folder
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                return reject(err) // If an error occurs, reject the promise
            }

            // Filter the contents to include only files (not directories)
            const fileNames = files.filter(file => {
                return fs.statSync(path.join(folderPath, file)).isFile()
            })

            resolve(fileNames) // Resolve with an array of file names
        })
    })
}

export default getFilesInFolder
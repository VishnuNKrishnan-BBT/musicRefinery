import { writeFileSync, existsSync } from 'fs'

function createFile(filePath, content = '') {
    try {
        // Check if the file already exists
        if (!existsSync(filePath)) {
            console.log(`-- Creating file at ${filePath}...`)
            writeFileSync(filePath, content)
            console.log('-- File created successfully')
        } else {
            console.log('-- File already exists')
        }
    } catch (err) {
        console.error('-- Error creating file:', err)
    }
}

export default createFile

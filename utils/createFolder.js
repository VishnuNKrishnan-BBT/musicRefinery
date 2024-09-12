import { mkdirSync, existsSync } from 'fs'

function createFolder(newPath) {
    try {
        // Check if the directory already exists
        if (!existsSync(newPath)) {
            console.log(`-- Creating folder for updated tracks...`)
            mkdirSync(newPath, { recursive: true })
            console.log('-- Directory created successfully')
        } else {
            console.log('-- Directory already exists')
        }
    } catch (err) {
        console.error('-- Error creating directory:', err)
    }
}

export default createFolder


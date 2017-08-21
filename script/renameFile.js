const fs = require('fs')

const webpackStatPath = './webpack-stats.json'
const webpackStat = JSON.parse(fs.readFileSync(webpackStatPath).toString())

const app_path = webpackStat.chunks[0].files.find(x => x.match(/\.js$/))
const style_path = webpackStat.chunks[0].files.find(x => x.match(/\.css$/))

console.log(`replacing "app_original_file.js" with "${app_path}"`)
console.log(`replacing "style_original_file.css" with "${style_path}"`)

const replace = path =>
    fs.writeFileSync(
        path,
        fs
            .readFileSync(path)
            .toString()
            .replace(/app_original_file\.js/g, app_path)
            .replace(/style_original_file\.css/g, style_path)
    )
;['./dist/index.html', './dist/sw.js'].forEach(replace)

// 本地文件读取
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

let defaultPath = path.join(os.homedir(), 'Desktop', 'data.json');
let filePath = path.join('initializationData', 'customG6GraphData.ts');
function loadFile(){
    const args = process.argv.slice(2);
    if(args[0]){
        defaultPath = args[0]
    }
    fs.readFile(defaultPath, 'utf8', (err, data) => {
        if (err) {
            console.error('读取文件时出错:', err);
            return;
        }
        console.log(filePath)
        if(fs.existsSync(filePath)){
            const content = `import type {G6GraphType} from '@/utils/def-type';\nexport const customG6GraphData: G6GraphType = ${data};`;
            fs.writeFileSync(filePath, content, 'utf-8')
        }else{
            console.log('获取不到路径文件')
        }
    });
}
loadFile();
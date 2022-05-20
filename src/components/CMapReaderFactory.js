/* eslint-disable */
const path = require('path')
const fs = require('fs')
const CMapCompressionType = {
    NONE: 0,
    BINARY: 1,
    STREAM: 2
};
module.exports=class CMapReaderFactory{
    constructor() {
    }
    fetch(data){
        return new Promise((resolve)=>{
            fs.readFile(path.resolve(process.cwd(),`./resources/pdfjs/cmaps/${data.name}.bcmap`),(err,res)=>{
                console.log(res)
                resolve({
                    cMapData: res,
                    compressionType: CMapCompressionType.BINARY
                })
            })
        })
        // return import(`./buffer-loader!/resources/pdfjs/cmaps/${data.name}.bcmap`).then(res=>{
        //     console.log(res)
        //     return {
        //         cMapData: res.default,
        //         compressionType: CMapCompressionType.BINARY
        //     }
        // })
    }
}


const ffi = require('ffi-napi')
const ref = require('ref-napi')
const arrayType = require('ref-array-napi')
const intArray = arrayType(ref.types.int)
const path = require('path')
const { arch } = process

let dllpath = path.resolve('resources/dll/MYDLLDEMO_x64.dll')
if(arch==='x86'){
    dllpath = path.resolve('resources/dll/MYDLLDEMO_x86.dll')
}

const lib = new ffi.Library(dllpath, {
    add: ['int', ['int', 'int']],
    addPtr: ['void', ['int', 'int', 'int*']],
    initArray: ['void', [intArray, 'int']]
})

module.exports = {
    add: function(a,b){
        return lib.add(a,b)
    },
    addPtr: function(a,b){
        const ptrres = ref.alloc(ref.types.int, 100)
        lib.addPtr(a,b, ptrres)
        return ref.deref(ptrres)
    },
    initArray: function(n){
        const array = new intArray(n)
        lib.initArray(array, n)
        let result = []
        for (let i = 0; i < n; i++) {
            result.push(array[i])
        }
        return result
    }
}







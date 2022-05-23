<template>
  <button @click="randomUserId">randomUserId</button>
  <button @click="copyQR">copyQR</button>
  <img :src="qrobj.dataUrl"/>
</template>

<script>
/* eslint-disable */
import {reactive, watch} from 'vue'
const path = require('path')
const fs = require('fs')
const QRCode = require('qrcode')
const { clipboard,nativeImage } = require('electron')
export default {
  name: "CopyQR",
  setup() {
    let qrobj = reactive({
      userId: '',
      dataUrl: '',
      pngsrc:''
    })
    function randomUserId() {
      qrobj.userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    watch(() => {
      return qrobj.userId
    }, (newVal) => {
      console.log('newVal', newVal)
      QRCode.toDataURL(`http://lijing.yogurt.com?userId=${newVal}`,{},(err,dataUrl)=>{
        qrobj.pngsrc = path.resolve(process.cwd(),`./resources/qrpics/${newVal}.png`)
        fs.open(qrobj.pngsrc,'w+',(err,fd)=>{
          qrobj.dataUrl = dataUrl
          let execres = /data:\w+\/(\w+);base64,([a-zA-Z0-9+/=]+)/.exec(dataUrl)
          let bi = Buffer.from(atob(execres[2]),'latin1')
          fs.write(fd,bi,(err)=>{if(err)throw new Error(err)})
        })
      })
    })
    function copyQR(){
      const image = nativeImage.createFromPath(qrobj.pngsrc)
      clipboard.writeImage(image)
    }
    return {
      qrobj, randomUserId,copyQR
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <button :disabled="Obj.current<=1" @click="paging(-1)">previous</button>{{ Obj.current }}<button :disabled="Obj.current>=Obj.totalPage" @click="paging(1)">next</button>
  <button :disabled="Obj.scl<=0.2" @click="zoom(-1)">out</button>{{ Obj.scl }}<button :disabled="Obj.scl>=4" @click="zoom(1)">in</button>
  <br/>
  <canvas id="pdf-canvas"></canvas>
</template>

<script>
import {onMounted, reactive, toRaw, readonly} from "vue";
const pdfjsLib = require('pdfjs-dist')
pdfjsLib.GlobalWorkerOptions.workerSrc= './resources/pdfjs/pdf.worker.js'
const cMapUrl = './cmaps/'
const url = './resources/pdfjs/file2.pdf'
// const path = require('path')
export default {
  name: "PdfjsTest",
  setup(){
    let Obj = reactive({
      pdfHandle:undefined,
      totalPage:0,
      current:0,
      dpr: window.devicePixelRatio||1,
      scl: 2
    })
    let Tools = null
    onMounted(()=>{
        let can = document.getElementById('pdf-canvas')
        Tools = readonly({
          can,
          ctx:can.getContext('2d')
        })
        let loadingTask = pdfjsLib.getDocument({url,useWorkerFetch:true,cMapUrl,cMapPacked:true});
        loadingTask.promise.then((pdf)=>{
          Obj.pdfHandle = pdf
          Obj.totalPage = pdf.numPages
          renderPage(1)
        });
    })
    function zoom(sign){
      Obj.scl=(parseFloat(Obj.scl)+sign*0.1).toFixed(1)
      renderPage()
    }
    function paging(sign){
      Obj.current = Obj.current+sign
      renderPage()
    }
    function renderPage(index){
      Obj.current = index||Obj.current
      toRaw(Obj.pdfHandle).getPage(Obj.current).then(function(page) {
        let vp = page.getViewport({scale:Obj.scl})
        let w =vp.width, h=vp.height
        Tools.can.width = Math.floor(w*Obj.dpr)
        Tools.can.height = Math.floor(h*Obj.dpr)
        Tools.can.style.width = Math.floor(w)+'px'
        Tools.can.style.height = Math.floor(h)+'px'
        let transform = Obj.dpr !== 1
            ? [Obj.dpr, 0, 0, Obj.dpr, 0, 0]
            : null;
        page.render({
          canvasContext:Tools.ctx,
          viewport:vp,
          transform
        })
      });
    }
    return {
      Obj,Tools,renderPage,zoom,paging
    }
  }
}
</script>

<style scoped>

</style>

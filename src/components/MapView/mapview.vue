<template>
  <el-main id="viewDiv">
  </el-main>
</template>

<script type="text/ecmascript-6">
  import esriLoader from 'esri-loader'
  import arcgisapi from 'arcgis-js-api/bower'

  export default {
    name: 'mapview',
    data () {
      return {
        webmap: {}
      }
    },
    mounted() {
      this.createMap()
    },
    methods: {
      createMap: function () {
        const options = arcgisapi
        let maplayer = ''
        esriLoader.loadModules(['esri/Map', 'esri/views/SceneView', 'esri/layers/FeatureLayer', 'dojo/domReady!'], options).then(([Map, SceneView, FeatureLayer]) => {
          maplayer = new Map({
            basemap: 'streets',
            ground: 'world-elevation'
          })
          /* eslint-disable no-new */
          new SceneView({
            map: maplayer,
            container: 'viewDiv',
            center: [113.30328196851, 23.07569666626],
            locale: 'zh-cn',
            logo: false,
            slider: false
          })
          const layer = new FeatureLayer('http://172.16.50.178:6080/arcgis/rest/services/GXStonyState/smhzk_fir/MapServer/0')
          console.log(layer)
          maplayer.add(layer)
          this.webmap = maplayer
        })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import url('http://js.arcgis.com/4.6/esri/css/main.css');
    #viewDiv
      height: 880px;
      width: 100%;
</style>

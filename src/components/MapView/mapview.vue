<template>
  <el-main id="viewDiv">
  </el-main>
</template>

<script type="text/ecmascript-6">
  import esriLoader from 'esri-loader'
  import arcgisapi from 'arcgis-js-api/bower'

  export default {
    name: 'mapview',
    mounted() {
      this.createMap()
    },
    methods: {
      createMap: function () {
        const options = arcgisapi
        esriLoader.loadModules(['esri/views/MapView', 'esri/WebMap'], options).then(([MapView, WebMap]) => {
          const webmap = new WebMap({
            portalItem: {
              id: 'f2e9b762544945f390ca4ac3671cfa72'
            }
          })
          /* eslint-disable no-new */
          new MapView({
            map: webmap,
            container: 'viewDiv',
            center: [113.30328196851, 23.07569666626],
            zoom: 10,
            locale: 'zh-cn'
          })
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
    height: 870px;
    width: 100%;
</style>

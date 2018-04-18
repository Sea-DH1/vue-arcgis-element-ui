<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <map-view></map-view>
    </el-container>
  </div>
</template>

<script>
  import MapView from 'components/MapView/mapview'

  export default {
    components: {
      MapView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  body >>> .el-container
    margin-bottom: 40px
  .el-container
    .el-header
      background-color: #409EFF
      color: #333
      text-align: center
      line-height: 60px
    .el-aside
      background-color: #d3dce6
      color: #333
      text-align: center
      line-height: 200px
    .el-main
      /*background-color: #E9EEF3;;*/
      /*color: #333;*/
      /*text-align: center;*/
      /*line-height: 160px;*/
      padding: 0
</style>

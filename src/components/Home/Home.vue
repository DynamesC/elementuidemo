<template>
  <div class="hello">


    <el-container style="height: 100%; border: 1px solid #eee" direction="vertical">
      <el-container>
        <el-header style="text-align: right; font-size: 12px; height: 200px">

          <el-button type="primary" style = "position:absolute; top:60px; right:40px; width:100px" icon="el-icon-switch-button" @click="logout">登出</el-button>
          <el-button type="primary" style = "position:absolute; top:140px; right:40px" @click="changeAdClicked">更换广告</el-button>

          <el-dialog title="更换广告" :visible.sync="showContentChangeDialog">
            <el-form :model="form">
              <el-form-item label="广告组" :label-width="formLabelWidth">
                <el-select v-model="form.ad_index" placeholder="请选择广告">
                  <el-option
                      v-for="item in ad_data"
                      :key="item.name"
                      :label="item.name"
                      :value="item.index">
                  </el-option>
<!--                  <el-option label="蓝莓锅里酸奶块" value="blueberry"></el-option>-->
<!--                  <el-option label="炫迈口香糖" value="strike"></el-option>-->
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showContentChangeDialog = false">取 消</el-button>
              <el-button type="primary" @click="confirmAdChange">确 定</el-button>
            </div>
          </el-dialog>

        </el-header>
      </el-container>

      <el-container height = "100%">
<!--        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
<!--          <el-menu :default-openeds="['1', '3']">-->
<!--            <el-submenu index="1">-->
<!--              <template slot="title"><i class="el-icon-message"></i>导航一</template>-->
<!--              <el-menu-item-group>-->
<!--                <template slot="title">分组一</template>-->
<!--                <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--              </el-menu-item-group>-->
<!--              <el-menu-item-group title="分组2">-->
<!--                <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--              </el-menu-item-group>-->
<!--              <el-submenu index="1-4">-->
<!--                <template slot="title">选项4</template>-->
<!--                <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
<!--              </el-submenu>-->
<!--            </el-submenu>-->
<!--          </el-menu>-->
<!--        </el-aside>-->

        <el-main>
          <el-table ref="multipleTable" :data="tableData" height="600px"
                    tooltip-effect="dark" @selection-change="handleSelectionChange"
                    v-loading="loading" v-if="showTable">
            <el-table-column fixed="left" type="selection" width="55" :selectable="checkSelectable"></el-table-column>
            <el-table-column prop="id" label="ID" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="connection_status" label="在线状态" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="device_type" label="设备类型" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="screen_size" label="屏幕尺寸" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gateway_mac" label="所属网关" width="140" show-overflow-tooltip></el-table-column>
<!--            <el-table-column prop="good_id" label="商品ID" width="140" show-overflow-tooltip></el-table-column>-->
            <el-table-column prop="ad_name" label="广告名称" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="action_count" label="扫码次数" width="80" show-overflow-tooltip></el-table-column>
<!--            <el-table-column prop="demo_id" label="模板ID" width="140" show-overflow-tooltip></el-table-column>-->
<!--            <el-table-column prop="demo_name" label="模板名称" width="140" show-overflow-tooltip></el-table-column>-->
<!--            <el-table-column prop="city" label="城市" width="80" show-overflow-tooltip=“true”></el-table-column>-->
<!--            <el-table-column prop="complex" label="综合体" width="140" show-overflow-tooltip=“true”></el-table-column>-->
<!--            <el-table-column prop="site" label="站点" width="200" show-overflow-tooltip=“true”></el-table-column>-->

<!--            <el-table-column prop="id_in_site" label="站点内ID" width="140" show-overflow-tooltip=“true”></el-table-column>-->
            <el-table-column prop="battery_level" label="电量" width="80" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import router from "@/router";
const axios = require('axios').default;

export default {
  name: 'Home',
  props: {
    msg: String
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  data() {
    return {
      showTable: true,
      showContentChangeDialog: false,
      headers :{
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('myToken')
      },
      tableData: [],
      labelMacs: [],
      ad_data:[
        { index: -1,
          name: '请选择广告'
        },{ index: 1,
          name: 'test1',
          barcode_without_mac: 'test1',
          small_demo_id: '058f8db12ae1482b850da1454f90b988',
          large_demo_id: 'ee603ff46c694cbc826eec0239085c3e'
        }, {
          index: 2,
          name: 'test2',
          barcode_without_mac: 'test2',
          small_demo_id: 'aa39e1f3cef74938b650a6944b8f09e9',
          large_demo_id: 'f765506a1d1546ea8b80f5fb99377ed6'
        }
      ],
      loading:true,
      multipleSelection: [],
      param_for_querying_labels : {page : 1, size: 1000, storeUuid : '0108'},
      param_for_querying_gateways : {page : 1, size: 1000, storeUuid : '0108'},
      form: {
        ad_index : -1
      },
      formLabelWidth: '120px'
    }
  },

  methods: {

    logout(){
      console.log('logout pressed')
      window.sessionStorage.removeItem('myToken');
      router.push('/login')
    },

    fetchData(){
      this.loading = true
      this.labels_fetched = false
      this.gateways_fetched = false
      let self = this

      function checkFailed (then) {
        return function (responses) {
          const someFailed = responses.some(response => response.error)

          if (someFailed) {
            throw responses
          }

          return then(responses)
        }
      }

      axios.all([

        axios.post('V2/pub/label/query',this.param_for_querying_labels, {
          headers: this.headers,
          params: this.param_for_querying_labels
        }),

        axios.get('V2/gateway', {
          headers: this.headers,
          params: this.param_for_querying_gateways
        })

      ]).then(checkFailed(([response1, response2]) => {
        self.fetchLabelDataSucceeded(response1)
        self.fetchGatewayDataSucceeded(response2)
      })).catch(axios.spread((error1, error2) => {
            self.fetchLabelDataFailed(error1)
            self.fetchGatewayDataFailed(error2)
          }
      ))


    },

    // Handling label data
    fetchLabelDataSucceeded(response){
      console.log('label fetching succeeded')
      console.log(response.data)

      let labelInfoList = response.data.body.list
      console.log(labelInfoList.length + ' labels found')
      let self = this

      for (let i = 0; i < labelInfoList.length; i++) {

        let labelInfo = labelInfoList[i]
        let mac = labelInfo.mac
        this.labelMacs.push(mac)
        let batteryLevel = labelInfo.battery
        let screenSizeText = labelInfo.screenSize
        let connection_status = '离线'
        let gateway_mac = ''
        if(labelInfo.correspond != null){
            gateway_mac = labelInfo.correspond.gatewayMac
        }

        if(labelInfo.heartbeat != '1' && labelInfo.heartbeat != '0'){
          connection_status = '在线'
        }

        this.tableData.push({
          id : mac,
          battery_level: batteryLevel,
          screen_size: this.decodeScreenSize(screenSizeText),
          device_type:'屏幕',
          connection_status: connection_status,
          gateway_mac: gateway_mac,
          ad_name : ''
        })
      }

      self.fetchGoodsBinding()
      // self.fetchLabelTemplateBinding()

      this.loading = false
    },

    fetchLabelDataFailed(error){
      if(error == null) return
      this.loading = false
      this.$message.error('设备信息拉取失败');
      console.log('label fetching failed')
    },

    decodeScreenSize(screenSizeText){
      if(screenSizeText === '000c'){
        return 4.2
      }else if(screenSizeText === '000f'){
        return 5.83
      }
      return 'not defined'
    },

    //Handling gateway data
    fetchGatewayDataSucceeded(response){
      console.log('gateway fetching succeeded')
      console.log(response.data)
      let gatewayInfoList = response.data.list
      console.log(gatewayInfoList.length + ' gateways found')

      for (let i = 0; i < gatewayInfoList.length; i++) {
        let gatewayInfo = gatewayInfoList[i]
        let mac = gatewayInfo.mac
        this.tableData.push({
          id : mac,
          connection_status: gatewayInfo.mode,
          device_type:'网关',
          screen_size: 'N/A',
          battery_level: 'N/A'
        })
      }

      this.loading = false
    },

    fetchGatewayDataFailed(error){
      if(error == null) return
      this.loading = false
      this.$message.error('网关信息拉取失败');
      console.log('gateway fetching failed')
    },

    fetchGoodsBinding(){
      let self = this
      console.log('fetch goods binding called')
      let goods_requests = []

      function checkFailed (then) {
        return function (responses) {
          const someFailed = responses.some(response => response.error)

          if (someFailed) {
            throw responses
          }

          return then(responses)
        }
      }

      for (let i = 0; i < this.labelMacs.length; i++) {
        goods_requests.push(axios.get('/V2/label/query', {
          headers: this.headers,
          params: {mac: this.labelMacs[i]}
        }))
      }

      axios.all(goods_requests).then(checkFailed((responses) => {
        console.log(responses)
        for (let i = 0; i < responses.length ; i++) {
          let response = responses[i]
          if(response.data.status!=200)continue
          console.log(response)

          let good_barcode = response.data.body.barcode
          let good_name = response.data.body.label4

          let thisMac = response.request.responseURL.split('=')[1]

          console.log('good result successfully fetched for ' + thisMac)

          for (let j = 0; j < self.tableData.length; j++) {
            const labelData = self.tableData[j]
            if (labelData.id == thisMac) {
              console.log(good_barcode.substring(0, good_barcode.length-12))
              labelData.good_barcode_without_mac = good_barcode.substring(0, good_barcode.length-12)
              labelData.good_barcode = good_barcode
              labelData.good_name = good_name

              let found_matching_ad = false

              for (let k = 0; k < self.ad_data.length; k++) {
                const adData = self.ad_data[k]
                if(adData.barcode_without_mac == labelData.good_barcode_without_mac){
                  labelData.ad_name = adData.name
                  found_matching_ad = true
                  break
                }
              }

              if(!found_matching_ad){
                labelData.ad_name = good_name
              }

              break
            }
          }

        }
        self.reloadTable()
        self.fetchActionCount()
      })).catch(axios.spread((errors) => {
            console.log(errors)
          }
      ))
    },

    fetchActionCount(){
      let self = this
      console.log('fetch action count called')
      let requests = []

      function checkFailed (then) {
        return function (responses) {
          const someFailed = responses.some(response => response.error)

          if (someFailed) {
            throw responses
          }

          return then(responses)
        }
      }

      for (let i = 0; i < self.tableData.length; i++) {
          let labelData = self.tableData[i]
          let mac = labelData.id
          let ad_name = labelData.ad_name
          let ad_id = ''

          for (let j = 0; j < self.ad_data.length; j++) {
              let adData = self.ad_data[j]
              if(ad_name == adData.name){
                ad_id = adData.barcode_without_mac
                break
              }
          }

          if(ad_id == '') continue

          requests.push(axios.get('/api/landingpages/get-action-count', {
            params: {
              adId: ad_id,
              mac: mac
            },
            baseURL: 'http://192.168.1.127:8080/'
          }))

          axios.all(requests).then(checkFailed((responses) => {
            console.log(responses)
            for (let i = 0; i < responses.length ; i++) {
              let response = responses[i]

              console.log(response)

              let thisMac = response.request.responseURL.split('mac=')[1]
              thisMac = thisMac.split("&")[0]

              console.log(thisMac)

              for (let j = 0; j < self.tableData.length; j++) {
                  const labelData = self.tableData[j]
                  if(labelData.id == thisMac){
                      labelData.action_count = response.data
                  }
              }

            }

            self.reloadTable()

          })).catch(axios.spread((errors) => {
                console.log(errors)
              }
          ))

      }


    },

    fetchLabelTemplateBinding(){
      //0902 TODO
      let self = this
      let templates_requests = []

      function checkFailed (then) {
        return function (responses) {
          const someFailed = responses.some(response => response.error)

          if (someFailed) {
            throw responses
          }

          return then(responses)
        }
      }

      for (let i = 0; i < this.labelMacs.length; i++) {
        let thisMac = this.labelMacs[i]
        templates_requests.push(axios.post('/V2/pub/binding/query', {mac: thisMac}, {
          headers: this.headers,
          params: {mac: thisMac},
        }))
      }

      axios.all(templates_requests).then(checkFailed((responses) => {
        console.log(responses)
        for (let i = 0; i < responses.length ; i++) {
          let response = responses[i]
          console.log(response)
          if(response.data.status == 431) continue
          let template_id = response.data.body.templets[0].demoId
          let template_name = response.data.body.templets[0].demoName
          let thisMac = response.request.responseURL.split('=')[1]
          console.log(thisMac)

          for (let j = 0; j < self.tableData.length; j++) {
            const labelData = self.tableData[j]
            if (labelData.id == thisMac){
              labelData.demo_id = template_id
              labelData.demo_name = template_name
              break
            }
          }
          self.reloadTable()
        }

      })).catch(axios.spread((errors) => {
            console.log(errors)
          }
      ))
    },

    changeAdClicked(){
      if(this.multipleSelection.length == 0){
        this.$message.error('请至少选择一个屏幕');
      }else{
        this.showContentChangeDialog = true
      }
    },

    confirmAdChange(){
      this.showContentChangeDialog = false

      if(this.form.ad_index == -1){
        return
      }

      let ad_info = this.ad_data[this.form.ad_index]
      let update_requests = []

      for (let i = 0; i < this.multipleSelection.length; i++) {
        let mac = this.multipleSelection[i].id
        let demo_id = ad_info.small_demo_id
        if (this.multipleSelection[i].screen_size == 5.83) {
          demo_id = ad_info.large_demo_id
        }
        let update_params = {
          mac: mac,
          barcode: ad_info.barcode_without_mac + mac,
          demoId: demo_id,
          storeId: '0108'
        }

        update_requests.push(axios.post('/V2/pub/bind/update', update_params, {
          headers: this.headers,
        }))
      }

      function checkFailed (then) {
        return function (responses) {
          const someFailed = responses.some(response => response.error)

          if (someFailed) {
            throw responses
          }

          return then(responses)
        }
      }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      let self = this
      axios.all(update_requests).then(checkFailed((responses) => {
          console.log(responses)
          // for (let i = 0; i < responses.length; i++) {
          //   let response = responses[i]
          //   if(response.request.data.status != 200)continue
          //   let thisMac = JSON.parse(response.config.data).mac
          //   for (let j = 0; j < self.tableData.length; j++) {
          //       let data = self.tableData[j]
          //       if(data.id == thisMac){
          //         let demo_id = ad_info.small_demo_id
          //         if (this.multipleSelection[i].screen_size == 5.83) {
          //           demo_id = ad_info.large_demo_id
          //         }
          //         data.demo_id = demo_id
          //         data.good_id = ad_info.barcode
          //       }
          //   }
          //
          // }
          loading.close()
          // self.fetchLabelTemplateBinding()
          self.fetchGoodsBinding()
          // this.fetchData()
      })).catch(axios.spread((errors) => {
            console.log(errors)
            loading.close()
          }
      ))

      this.form.ad_index = -1

    },

    reloadTable(){
      this.showTable = false
      this.$nextTick(() =>{
        this.showTable = true
      })
    },

    checkSelectable(row){
      return row.device_type != '网关' && row.connection_status == '在线'
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    tableRowClassName({row, rowIndex}) {
      if (row.connection_status != '在线') {
        console.log(rowIndex)
        return {"background-color" : "#e9c8c3"}
      }

    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-table. warning-row {
  background: #ac2f81;
}

.el-table. success-row {
  background: #f0f9eb;
}

.el-aside {
  color: #333;
}
</style>

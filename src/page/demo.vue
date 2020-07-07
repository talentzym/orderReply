<template>
  <div class="upload-image">

<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  
    <el-form-item
    v-for="(item, index) in dynamicValidateForm.domains"
    :label="'子项目' + index"
    :key="item.key"
    :prop="'domains.' + index + '.msg'">
        <el-form-item
            label="值"
            :rules="{
                required: true, message: '值不能为空', trigger: 'blur'
            }"
            :prop="'domains.' + index + '.value'">
            <el-input v-model="item.value"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name">
            <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="bieming">
            <el-input v-model="item.bieming"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="guanjianci">
            <el-tag v-for="(span, i) in item.guanjianci" :key="i" v-show="i <= 2">{{ span }}</el-tag>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addKeyword(item.guanjianci, index)"></el-button>
        </el-form-item>
        <el-button @click.prevent="removeDomain(item)">删除</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="addDomain">新增域名</el-button>
  </el-form-item>
</el-form>
    <el-dialog :title="'编辑关键词：' + rows + '个'" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="">
                <el-input type="textarea" v-model="form.desc" style="width:60%" @keyup.enter.native="onEnterSearch(form.desc)"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="keywordSubmit">确 定</el-button>
        </div>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
        form:{
            desc: ''
        },
        dynamicValidateForm: {
            domains: [
                {
                    wanghao: '',
                    name: '',
                    bieming: '',
                    guanjianci: ''
                }
            ]
        },
        dynamicTags: [],
        keyword: '',
        rows: 0,
        keywordArr: [],
        dialogFormVisible: false,
        index: 0
     }
        
            
  },
  methods: {
     submitForm(formData) {
        // let arr = this.dynamicValidateForm.domains
        // for (let i = 0; i < arr.length; i++) {
        //     arr[i].guanjianci = arr[i].guanjianci.join(",")
        // }
        // console.log(this.dynamicValidateForm.domains)
        this.$refs[formData].validate((valid) => {
            if (valid) {
                console.log('111')
            }
        })
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
            wanghao: '',
            name: '',
            bieming: '',
            guanjianci: ''
        });
      },
      addKeyword (item, i) {
          this.index = i
          if (this.dynamicValidateForm.domains[i].guanjianci) {
              let deseText = this.dynamicValidateForm.domains[i].guanjianci.join("\n")
              this.form.desc = deseText
          }
          this.rows = this.dynamicValidateForm.domains[i].guanjianci.length
          this.dialogFormVisible = true
      },
      onEnterSearch (item) {
          console.log(item);
          this.rows = item.split("\n").length
          console.log(this.rows)
      },
      keywordSubmit () {
        let descValue = this.form.desc;
        // console.log(descValue);
        let deseArr = descValue.split("\n")
        console.log(deseArr)
        let i = this.index
        this.dynamicValidateForm.domains[i].guanjianci = deseArr
        this.form.desc = ''
        this.dialogFormVisible = false
      }
  }
}
</script>

<style lang="less">
.upload-image{
    .el-tag{
        margin-right: 8px;
    }
}
</style>

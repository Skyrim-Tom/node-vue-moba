<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "itemEdit",
  props: {
    id: String
  },
  data() {
    return {
      model: {},
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res = {}
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model) //把异步函数写法换成类似同步函数写法
      } else {
        res = await this.$http.post('rest/items', this.model) //把异步函数写法换成类似同步函数写法
      }
      console.log('%c 返回数据', 'color: pink', res)
      this.$router.push('/items/list')
      this.$message({ //element-ui提供的方法
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

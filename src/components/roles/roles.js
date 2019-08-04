export default {
  data () {
    return {
      rolesTableData: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }],
      // 显示权限分配对话框
      dialogFormVisible: false,
      // 树形控件 数据
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色id
      roleId: 0
    }
  },
  created () {
    // 加载角色列表
    this.getRolesData()
    // 加载所有权限列表
    this.getRightsData()
  },
  methods: {
    // 获取角色列表
    async getRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      // 把获取到的角色数据赋值给data里的rolesTableData
      if (res.data.meta.status === 200) {
        this.rolesTableData = res.data.data
      }
    },
    // 自定义下标
    indexMethod (index) {
      return index
    },
    // 点击打开分配权限对话框
    showTree (row) {
      this.dialogFormVisible = true
      console.log(row)
      this.roleId = row.id
      // console.log(this.roleId)
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(keys)
    },
    // 获取分配权限数据
    async  getRightsData () {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.treeData = res.data.data
      }
    },
    // 角色授权
    async amentRoles () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = [...keys1, ...keys2]
      console.log(keys)
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        // 提示角色授权完成
        // 更新角色列表
        this.dialogFormVisible = false
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        this.getRolesData()
      }
    }
  }

}

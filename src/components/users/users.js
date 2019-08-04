
export default {
  name: 'users',
  data () {
    return {
      // 表格数据
      tableData: [{
        username: '王小虎',
        email: '771839664@qq.com',
        mobile: 123321

      }
      ],
      // 跟HTML对应total
      total: 0,
      // 获取当前页
      pagenum: 1,
      search: '',
      // 对话框状态
      dialogAddUserVisible: false,
      // 添加用户数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验 格式数据是否正确
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2到6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 13, message: '长度在6到13个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '格式错误', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '格式错误', trigger: 'blur' }
        ]

      },
      // 编辑数据
      amentForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      // 是否打开对话框
      dialogAmentFormVisible: false
    }
  },
  // 钩子函数 打开获取数据
  created () {
    this.getUsersData()
  },
  // 打开编辑 对话框
  methods: {
    // 获取全部数据清求
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }

      }).then(res => {
        // console.log(res)
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        // 保存页数
        this.pagenum = res.data.data.pagenum
      })
    },
    // 分页器 点击更换pagenum
    currentPageChange (e) {
      //  在之前只有一个参数的时候默认的query为空就是默认获取全部
      //  如果有第二个参数则需要把第二个参数写入不然获取的还是全部数据的第二页
      this.getUsersData(e, this.search)
    },
    // 获取搜索的内容
    searchUser () {
      this.getUsersData(1, this.search)
    },
    // 给input框 设置键盘事件，失焦的时候触发，获取最新的搜索数据
    searchUserkey () {
      this.getUsersData(1, this.search)
    },
    //  打开对话框
    showAddUser () {
      this.dialogAddUserVisible = true
    },
    // 点击添加获取 数据
    addUser () {
      this.$axios.post('users', this.addUserForm).then(res => {
        console.log(res)
        // 判断是否登入成功
        if (res.data.meta.status === 201) {
          // 登入成功 打开消息提示框
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // 关闭弹出框
          this.dialogAddUserVisible = false
          // 刷新
          this.getUsersData(1)
          // 添加失败 给用户提示
        } else if (res.data.meta.status === 400) {
          this.$message({
            message: '该用户名已存在,或格式不正确',
            type: 'error'
          })
        }
      })
    },
    // 对话框关闭时重置数据
    hide () {
      this.$refs.addDialog.resetFields()
    },
    // 删除用户
    delUser (id) {
      this.$axios.delete(`users/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          this.getUsersData(1)
        }
      })
      // console.log(id)
    },
    //  修改用户状态
    /* eslint-disable */
    xiugai (row) {
      // console.log(123)
      const { id, mg_state } = row
      this.$axios.put(`users/${id}/state/${mg_state}`

      ).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 800
          })
        }
      })
    },
    // 点击显示对话框
    dialogShowForm (row) {
      // 显示对话框
      // console.log(row)
      this.dialogAmentFormVisible = true
      // 接受 row 的值
      const { username, email, mobile, id } = row
      // 给 amentForm 赋值
      this.amentForm.username = username
      this.amentForm.email = email
      this.amentForm.mobile = mobile
      this.amentForm.id = id
      // console.log(username, email, mobile)
    },
    // 编辑用户资料
    async amentUsersForm () {
      // 配置下获取信息 发送axios
      const { id, email, mobile } = this.amentForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      // 关闭对话框
      this.dialogAmentFormVisible = false
      // 重新获取下数据
      this.getUsersData()
    }

  },
}

###  文件上传

1. antd 拖拽上传组件，自动触发上传接口

2. antd 上传按钮，手动上传
  ``` js
    #手动上传给axios添加 headers
    const config ={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }

    axios.post('http://localhost:3000/api/upload/formdata', formData,config)
      .then( res => {
        console.log(res)
      }).catch( err => console.log(err))
  ```

3. input[type:file] 获取原生DOM file列表


### 后端代码

[传送门:rocket:](https://github.com/zhaozhuoboy/koa2-study)
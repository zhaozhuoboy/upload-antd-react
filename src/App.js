import React, { Component } from 'react';
import './App.css';
import { Upload, Icon, message, Button} from 'antd';
import axios from 'axios';
const Dragger = Upload.Dragger;

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      fileList:[],
    }
    this.file=null;
  }
  customRequest = (info)=> {
    // const file = info.file.originFileObj
    // console.log(file)
    // axios.post('http://localhost:3000/api/upload', {
    //   file: file
    // })
  }
  handleChange = (info)=> {
    const file = info.file.originFileObj
    console.log( file )
    // axios.post('http://localhost:3000/api/upload', {
    //   file: file
    // })
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  //手动上传
  handleUpload= () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      console.log(file)
      formData.append('files', file,file.name);
    });
    const config ={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
    axios.post('http://localhost:3000/api/upload/formdata', formData,config).then( res => {
      console.log(res)
    }).catch( err => console.log(err))
  }

  //a 的事件，调用  input[type=file] 的click事件打开  选择文件对话框
  clickUpload =()=>this.file.click()
  //input[type=file] 的change事件
  handleFileChange =()=>{
    const {files:[file]} = this.file; 
    console.log(this.file.files[0])
    //创建formData对象 将file列表 append 进去
    //请求接口
  }
  render() {
    const props = {
      name: 'file',
      action:'http://localhost:3000/api/upload',
      multiple: true,
      showUploadList: false,
      onChange: this.handleChange,
      // customRequest: this.customRequest
    };
    const uploadProps={
      action:'http://localhost:3000/api/upload',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      }, 
      beforeUpload: (file) => {
        console.log('beforeUpload:',file)
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    }
    const style={
      diver:{
        margin:"20px auto",
        width:"100%",
        textAlign:"center"
      }
    }
    return (
      <div className="App">
        <p>这是antd的上传组件，可以支持拖动上传，选择文件后 自动发起上传请求</p>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
        <div style={style.diver}>------------------------------------------------------分割线-----------------------------------------------------</div>
        <p>这是antd的上传组件，手动上传</p>
        <Upload {...uploadProps}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
        >
          Start Upload
        </Button>
        <div style={style.diver}>------------------------------------------------------分割线-----------------------------------------------------</div>
        <p>这是input[type:file]选择文件上传，用a调用 input的click事件打开 选择文件对话框</p>
        <a onClick={this.clickUpload}>选择文件</a>
        <input type="file" onChange={this.handleFileChange} ref={ file => this.file = file} style={{display:'none'}}/>
        <Button onClick={ console.log(this.file)}>上传按钮</Button>
      </div>
    );
  }
}

export default App;

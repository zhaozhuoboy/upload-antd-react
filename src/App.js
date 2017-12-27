import React, { Component } from 'react';
import './App.css';
import { Upload, Icon, message} from 'antd';
import axios from 'axios';
const Dragger = Upload.Dragger;

class App extends Component {
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
  render() {
    const props = {
      name: 'file',
      action:'http://localhost:3000/api/upload',
      multiple: true,
      showUploadList: false,
      onChange: this.handleChange,
      // customRequest: this.customRequest
    };
    return (
      <div className="App">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
      </div>
    );
  }
}

export default App;

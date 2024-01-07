// UserLogin.js
import React, { useState , useEffect } from 'react';
import { username, nickname, UpdateName} from './UserData';
import { Button, Modal, Input, Form } from 'antd';
import axios from 'axios'; 

const UserLogin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginMode, setLoginMode] = useState(true); // true for login, false for register
  const [user_Name, SetUser_Name] = useState("");
  const [user_NickName, SetUser_NickName] = useState("");
  const [user_PassWord, SetUser_Password] = useState("");
  const [loginSuccess, SetLoginSuccess] = useState(false);

    const AddUser = async () => {
        console.log(user_Name);
        console.log(user_PassWord);
        console.log(user_NickName);
      try {
        const response = await axios.post('https://7q96yl67a3.execute-api.us-east-1.amazonaws.com/cors/UpdateDB',
        {
            "operation": "AddUser",
            "user_name" : user_Name,
            "user_password": user_PassWord,
            "user_nickname": user_NickName
        });
    
        console.log(response.data[0]);
        UpdateName(user_Name, user_NickName);
        SetLoginSuccess(true);
      } catch (error) {
        console.error('Error update data', error);
        SetLoginSuccess(false);
      }
    };

    const SearchUser = async () => {
        console.log(user_NickName);
        //console.log((guessDB)? 0:1);
        try {
        const response = await axios.get('http://localhost:8080/api/data/query_gain_passwordnickname', {
            params: {
            current_name: user_Name,
            }
        });
        
        console.log(response.data[0]);
        if(response.data[0] != null)
        {
            if(response.data[0].password_ == user_PassWord)
            {
                SetLoginSuccess(true);
                UpdateName(user_Name, response.data[0].nickname);
                //username = user_Name;
                //nickname = response.data[0].nickname;
            }
            else SetLoginSuccess(false);
        } }catch (error) {
        console.error('Error fetching data', error);
        }
    };

  const handleLogin = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    SetUser_Name("");
    SetUser_NickName("");
  };

  const handleFormSubmit = (values) => {
    console.log(values.username); // You can customize this part according to your backend logic
    SetUser_Name(values.username);
    SetUser_NickName(values.nickname);
    SetUser_Password(values.password);
    // Close the modal after submission
    setIsModalVisible(false);
  };

  useEffect(() => {
      if(user_PassWord != "") SearchUser();
      if(user_NickName != "") AddUser();
  }, [user_PassWord, user_NickName]);

  return (
    <div>
      {username === '' ? (
        <Button style={{ marginTop: '10%', marginBottom: '10%', textAlign: 'center' }} type="primary" onClick={handleLogin}>
          登入
        </Button>
      ) : (
        <h1 style={{ background: 'pink', color: 'black', padding: '20px', marginTop: '-2%', textAlign: 'center' }}>
          {username} 歡迎~
        </h1>
      )}

<Modal
        title={loginMode ? '登入' : '註冊'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {!loginMode && (
            <Form.Item
              label="nickname"
              name="nickname"
              rules={[{ required: true, message: 'Please input your nickname!' }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loginMode ? '登入' : '註冊'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <span onClick={() => setLoginMode(!loginMode)}>
            {loginMode ? '還沒有帳號？點擊註冊' : '已經有帳號？點擊登入'}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default UserLogin;
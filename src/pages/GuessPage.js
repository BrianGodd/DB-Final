import React, { useState } from 'react';
import MusicGuess from '../components/MusicGuess';
import SpotifyPlayerComponent from '../components/SpotifyPlayer';
import UserLogin from '../components/UserLogin';
import { ConfigProvider, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import { UpdateToken } from '../components/UserData';


 function GuessPage() {
    const { Header, Sider, Content } = Layout;
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    
    let navigate = useNavigate();
  
    const SwitchPage = (item) => {
      UpdateToken();
        switch (item.key) {
          case '1':
            window.scrollTo(0, 0);
            navigate("/DB-Final/");
            // 首頁的處理邏輯
            break;
          case '2':
            // 每周排行榜的處理邏輯
            window.scrollTo(0, 0);
            navigate("/DB-Final/Ranking");
            break;
          case '3':
            // 查詢歌曲的處理邏輯
            window.scrollTo(0, 0);
            navigate("/DB-Final/Search");
            break;
          case '4':
            // 製作歌單的處理邏輯
            window.scrollTo(0, 0);
            navigate("/DB-Final/PlayListPage");
            break;
          case '5':
            // 猜歌小遊戲的處理邏輯
            window.scrollTo(0, 0);
            navigate("/DB-Final/Guess");
            break;
          default:
            break;
        }
      };
  
    return (
      <div className="App">
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <UserLogin  isFix={false}/>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['5']}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: '首頁',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: '每周排行榜',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: '查詢歌曲',
                },
                {
                  key: '4',
                  icon: <UploadOutlined />,
                  label: '我的歌單',
                },
                {
                  key: '5',
                  icon: <UploadOutlined />,
                  label: '猜歌小遊戲',
                }
              ]}
              onClick={(item) => SwitchPage(item)}
            />
          </Sider>
          <Layout style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Image/guess.gif)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
          <Header style={{ padding: 0, background: 'linear-gradient(to right, #e6ffc2, #80d4ff)' , height: '82px'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-10px'}}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <h1 style={{ marginLeft: '40%' }}>MyMusic</h1>
            </div>
            </Header>
        
            <div> <br/><br/> </div>
            <div>
            {/* <SpotifySearch /> */}
            <MusicGuess/>
            
            {/* <p style={{position: 'absolute', top: '10px', left: '700px'}}>Update at 20240102</p> */}
            </div>
          </Layout>
        </Layout>
        
        
      </div>   
    );
  
}

  
export default GuessPage;
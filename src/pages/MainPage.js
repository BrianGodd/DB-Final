import React, { useState } from 'react';
import MusicSearch from '../components/MusicSearch';
import SpotifyPlayerComponent from '../components/SpotifyPlayer';
import SearchPage from "./SearchPage";
import GuessPage from "./GuessPage";
import { ConfigProvider, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom/client';

function MainPage() {

  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  
  let navigate = useNavigate();

  const SwitchPage = (item) => {
    switch (item.key) {
      case '1':
        // 首頁
        break;
      case '2':
        // 每周排行榜
        break;
      case '3':
        // 查詢歌曲
        window.scrollTo(0, 0);
        navigate("/DB-Final/Search");
        break;
      case '4':
        // 製作歌單
        break;
      case '5':
        // 猜歌小遊戲
        window.scrollTo(0, 0);
        navigate("/DB-Final/Guess");
        break;
      default:
        break;
    }
  };

  return (
    <div className="MainPage">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <h1 style={{ background: 'pink', color: 'black' ,padding: '20px', marginTop: '-2%'}}>user</h1>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
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
                label: '製作歌單',
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
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px'}}>
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
            <h1 style={{ marginLeft: '40%' }}>Music App</h1>
          </div>
          </Header>
        </Layout>
      </Layout>
      
      
    </div>   
  );
}

export default MainPage;

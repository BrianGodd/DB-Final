import React, { useState } from 'react';
import MusicSearch from './components/MusicSearch';
import SpotifyPlayerComponent from './components/SpotifyPlayer';
import { ConfigProvider, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './App.css';

function App() {

  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const [spotifyUri, setSpotifyUri] = useState('');

  const handleSearch = (uri) => {
    setSpotifyUri(uri);
  };

  const SwitchPage = async () => {
  };

  return (
    <div className="App">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
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
            onClick={SwitchPage}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
          </Header>
      
          <div> <br/><br/> </div>
          <div>
          <h1>Music App</h1>
          {/* <SpotifySearch /> */}
          <MusicSearch onSearch={handleSearch} />
          
          {/* <p style={{position: 'absolute', top: '10px', left: '700px'}}>Update at 20240102</p> */}
          </div>
        </Layout>
      </Layout>
      
      
    </div>   
  );
}

export default App;

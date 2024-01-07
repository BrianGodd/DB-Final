import React, { useState } from 'react';
import MusicSearch from '../components/MusicSearch';
import SpotifyPlayerComponent from '../components/SpotifyPlayer';
import UserLogin from '../components/UserLogin';
import SearchPage from "./SearchPage";
import GuessPage from "./GuessPage";
import RankPage from "./RankPage";
import PlayListPage from "./PlayListPage";
import { ConfigProvider, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Card} from 'antd';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { UpdateToken } from '../components/UserData';
import '../components/textFont.css';

function MainPage() {

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
        // 首頁
        break;
      case '2':
        // 每周排行榜
        window.scrollTo(0, 0);
        navigate("/DB-Final/Ranking");
        break;
      case '3':
        // 查詢歌曲
        window.scrollTo(0, 0);
        navigate("/DB-Final/Search");
        break;
      case '4':
        // 製作歌單
        window.scrollTo(0, 0);
        navigate("/DB-Final/PlayListPage");
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
            <UserLogin isFix={true}/>
            
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>首頁</span>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>每周排行榜</span>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>查詢歌曲</span>,
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>我的歌單</span>,
              },
              {
                key: '5',
                icon: <UploadOutlined />,
                label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>猜歌小遊戲</span>,
              }
            ]}
            onClick={(item) => SwitchPage(item)}
          />
        </Sider>
        <Layout  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Image/menu.gif)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
          <Header style={{ padding: 0, background: 'linear-gradient(to right, #e6ffc2, #80d4ff)' }}>
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
            <h1 style={{ marginLeft: '40%' }}>MyMusic</h1>
          </div>
          </Header>
            <Card title="最新資訊" bordered={true} headStyle={{ background: 'linear-gradient(to right, #FFD700, #FF6347)', color: 'black' }} 
            style={{ width: 300, backgroundColor: 'white', color: 'black' , marginTop: '20px', marginLeft: '38%', textAlign: 'center'}}>
              <p className="custom-text">2024.1.8 version</p>
            </Card>
            <p></p>
            <Card title="網頁介紹" bordered={true} headStyle={{ background: 'linear-gradient(to right, #FFD700, #FF6347)', color: 'black' }} 
            style={{ width: 300, backgroundColor: 'white', color: 'black' , marginTop: '20px', marginLeft: '38%', textAlign: 'center'}}>
              
              <p className="custom-text">鑒於網路上的猜歌網站尚未成熟，想利用資料庫期末專案的機會來打造一個能夠查歌、猜歌、收藏歌曲的網頁</p>
              <p></p>
              <hr style={{ width: '100%', margin: '20px 0' }} />
              <p className="custom-text">未來展望：將添加動漫猜歌、猜歌計分榜、本日亞洲前三名歌曲等等功能，敬請期待！</p>
            </Card>
            <p></p>
            <Card title="STAFF" bordered={true} headStyle={{ background: 'linear-gradient(to right, #FFD700, #FF6347)', color: 'black' }} 
            style={{ width: 300, backgroundColor: 'white', color: 'black' , marginTop: '20px', marginLeft: '38%', textAlign: 'center'}}>
              <p className="custom-text">BrianGodd 黃永恩</p>
              <p className="custom-text">Johnson7414 曾煥宗</p>
              <p className="custom-text">Mr.振源 邱振源</p>
              <p className="custom-text">Mr.紹幃 曾紹幃</p>
              <p className="custom-text">Mr.彥佑 林彥佑</p>
            </Card>
            <p></p>
        </Layout>
      </Layout>
      
      
    </div>   
  );
}

export default MainPage;

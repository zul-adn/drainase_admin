import React, { useState, useEffect } from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { Layout, Menu, Divider, Typography, Button } from 'antd';
import {
    BuildTwoTone,
    SnippetsTwoTone,
    DatabaseTwoTone,
    CrownTwoTone,
    DashboardTwoTone,
    LogoutOutlined,
    UserAddOutlined,
    DollarCircleTwoTone,
    SmileTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Master.css';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from './reducer/LocalStoradge'
import { createBrowserHistory } from "history"

//const history = createBrowserHistory()

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
const { Title } = Typography;

export default function Master(props) {
    const [collapsed, setCollapsed] = useState(false);
    const datasFromReducer = useSelector(state => state.savedDatas)
    const [datas, setDatas] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true)
    const [tahun, setTahun] = useState('')

    useEffect(async () => {
        await isLoginFunc()
        // if(login === false){
        //    return  <Redirect to={'/'} />
        // }
    }, [])

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        const year = await localStorage.getItem('tahun')
        if (loginDatas !== null) {
            setLogin(true)
            setDatas(loginDatas)
            setTahun(year)
            setDataUsers(loginDatas.data[0])
        } else {
            setLogin(false)
        }
        console.log(loginDatas)
    }

    const logout = async () => {
        localStorage.clear()
        setLogin(false)
        window.location.href = '/';
    }

    const toggle = () => {
        setCollapsed(!collapsed)
        console.log(dataUsers)
    }

    const toLogin = () => {
        window.location.href = '/';
    }

    if (login) {
        return (

            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                    <div className="logo" style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}></div>
                    {dataUsers.akses === 'admin' && (
                        <Menu mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/dashboard`)} >
                                <DashboardTwoTone twoToneColor="#eb2f96" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <Menu.Item key="pegawai" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/polyline` )}>
                                <SmileTwoTone twoToneColor="#10ac84" />
                                <span>Polyline</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/gisattr` )}>
                                <CrownTwoTone twoToneColor="#546de5" />
                                <span>Data Pendukung</span>
                            </Menu.Item>
                            <Menu.Item key="8" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/administrator`)} >
                                <UserAddOutlined />
                                <span>Administrator</span>
                            </Menu.Item>
                        </Menu>
                    )
                    }

                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        {dataUsers.akses === 'blud' &&
                            <div style={{ paddingRight: 20, float: 'right' }}>
                                <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama_blud}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                            </div>
                        }
                        {dataUsers.akses === 'admin' &&
                            <div style={{ paddingRight: 20, float: 'right' }}>
                                <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                            </div>
                        }

                    </Header>
                    {props.children}
                </Layout>
            </Layout>
        )
    } else {
        return toLogin()
    }
}



import React from "react";
import { createHashHistory } from 'history'; // 如果是hash路由
import { Layout, Menu, Breadcrumb } from 'antd';

import { renderRoutes } from 'react-router-config'

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const history = createHashHistory();
interface IData {
    route: any,
}
interface IState {
    route: any,
    collapsed: boolean
}
export default class Home extends React.Component<IData, IState>{
    constructor(props: IData) {
        super(props);
        this.state = {
            route: props.route,
            collapsed: false
        }
    }
    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    onMenuClick = (event: {
        key: React.Key;
        keyPath: React.Key[];
        item: React.ReactInstance;
        domEvent: React.MouseEvent<HTMLElement>;
    }) => {
        const { key } = event;
        if (key === 'page21') {
            history.push('/page2');
        }else if(key === "page1"){
            history.push('/page1');
        } else {
            history.push('/');
        }
    };
    render() {
        const route = this.state.route;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onMenuClick}>
                        <Menu.Item key="page1" icon={<PieChartOutlined />}>
                        page1
                        </Menu.Item>
                        <SubMenu key="page2" icon={<UserOutlined />} title="page2">
                            <Menu.Item key="page21">page21</Menu.Item>
                            <Menu.Item key="page22">page22</Menu.Item>
                            <Menu.Item key="page23">page23</Menu.Item>
                        </SubMenu>
                        <SubMenu key="page3" icon={<TeamOutlined />} title="page3">
                            <Menu.Item key="page31">page31</Menu.Item>
                            <Menu.Item key="page32">page32</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>page3</Breadcrumb.Item>
                            <Breadcrumb.Item>page31</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {renderRoutes(route.children)}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>所有人不许动</Footer>
                </Layout>
            </Layout>
        );
    }
}
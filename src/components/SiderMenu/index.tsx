import { Menu } from 'antd'
import React from 'react'

export const SliderMenu = () => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">信息</Menu.Item>
        <Menu.Item key="2">用户</Menu.Item>
        <Menu.Item key="3">数据大屏</Menu.Item>
        <Menu.Item key="4">数据分析</Menu.Item>
      </Menu>
    )
}

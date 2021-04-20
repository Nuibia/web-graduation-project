import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { history } from "../../router/history";
import PAGES from "../../router/pages";
import { MenuType } from "../../types/SiderMenu.ts";

export const SliderMenu = () => {

  const [selectedKeys, setSelectedKeys] = useState(MenuType.信息);
  let pathname = window.location.pathname;
  useEffect(() => {
    switch (pathname) {
      case PAGES.message:
        setSelectedKeys(MenuType.信息);
        break;
      case PAGES.userInfo:
        setSelectedKeys(MenuType.用户);
        break;
      case PAGES.dataAnalysis:
        setSelectedKeys(MenuType.数据分析);
        break;
      case PAGES.bigScreen:
        setSelectedKeys(MenuType.数据大屏);
        break;
    
      default:
        break;
    }
  }, [pathname])
  const handleSelect = (e: any) => {
    setSelectedKeys(e.key);
    switch (e.key) {
      case MenuType.信息:
        history.push(PAGES.message);
        break;
      case MenuType.数据分析:
        history.push(PAGES.dataAnalysis);
        break;
      case MenuType.数据大屏:
        history.push(PAGES.bigScreen);
        break;
      case MenuType.用户:
        history.push(PAGES.userInfo);
        break;
    }
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[(selectedKeys as unknown) as string]}
      onSelect={handleSelect}
    >
      <Menu.Item key={MenuType.信息}>信息</Menu.Item>
      <Menu.Item key={MenuType.用户}>用户</Menu.Item>
      <Menu.Item key={MenuType.数据大屏}>数据大屏</Menu.Item>
      <Menu.Item key={MenuType.数据分析}>数据分析</Menu.Item>
    </Menu>
  );
};

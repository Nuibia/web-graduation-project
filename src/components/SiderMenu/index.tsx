import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PAGES from "../../router/pages";
import { MenuType } from "../../types/SiderMenu.ts";

export const SliderMenu = () => {
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState<MenuType>();
  let pathname = window.location.pathname;
  useEffect(() => {
    switch (pathname) {
      case PAGES.message:
        setSelectedKeys(MenuType.信息);
        break;
      case PAGES.messageadd:
        setSelectedKeys(MenuType.信息添加);
        break;
      case PAGES.messageshow:
        setSelectedKeys(MenuType.信息展示);
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
      case PAGES.login:
        setSelectedKeys(MenuType.数据大屏);
        break;
    }
  }, [history, pathname]);
  const handleSelect = (e: any) => {
    setSelectedKeys(e.key);
    switch (e.key) {
      case MenuType.信息:
        history.push(PAGES.message);
        break;
      case MenuType.信息展示:
        history.push(PAGES.messageshow);
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
      <Menu.Item key={MenuType.信息}>信息操作</Menu.Item>
      <Menu.Item key={MenuType.信息展示}>信息展示</Menu.Item>
      <Menu.Item key={MenuType.用户}>用户操作</Menu.Item>
      <Menu.Item key={MenuType.数据大屏}>数据大屏</Menu.Item>
      <Menu.Item key={MenuType.数据分析}>数据分析</Menu.Item>
    </Menu>
  );
};

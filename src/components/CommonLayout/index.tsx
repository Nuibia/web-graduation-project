import { Layout } from "antd";
import React, { FC } from "react";
const { Header } = Layout;

interface CommonLayoutProps {
  isShowHeader?: boolean;
}

//公共布局组件
export const CommonLayout: FC<CommonLayoutProps> = ({
  isShowHeader = true,
  children,
}) => {
  return (
    <>
      {isShowHeader && <Header />}
      {children}
    </>
  );
};

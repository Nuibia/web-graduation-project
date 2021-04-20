import { Header } from "antd/lib/layout/layout";
import React, { FC } from "react";

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
      {isShowHeader && <Header/>}
      {children}
    </>
  );
};

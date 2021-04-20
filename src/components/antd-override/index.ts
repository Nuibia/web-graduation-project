import Layout from "antd/lib/layout/layout";
import styled from "styled-components";

export const LayoutContainer = styled(Layout)<{isShowSider?:boolean}>`
    margin-left: ${props=>props.isShowSider? '200px' : 0 };
    width:100% !important;
    height:100% !important;
    overflow:hidden;
`;
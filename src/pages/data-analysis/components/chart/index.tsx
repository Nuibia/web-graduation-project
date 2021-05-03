import React, { FC, useEffect, useState } from "react";
import { Chart, LineAdvance } from "bizcharts";
import { EnumChartType } from "../../../../types/data-ananysis";
interface DataChartProps {
  chartData: any[];
  type: EnumChartType;
}
export const DataChart: FC<DataChartProps> = ({ chartData, type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let addData = [];
    switch (type) {
      case EnumChartType.死亡人数:
        (chartData || []).forEach((item) => {
          addData.push({ 时间: item.dateId, 数量: item.deadCount });
        });
        break;
      case EnumChartType.治愈人数:
        (chartData || []).forEach((item) => {
          addData.push({ 时间: item.dateId, 数量: item.curedCount });
        });
        break;
      case EnumChartType.确诊人数:
        (chartData || []).forEach((item) => {
          addData.push({ 时间: item.dateId, 数量: item.currentConfirmedCount });
        });
        break;
    }
    setData(addData);
  }, [chartData, type]);
  return (
    <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data}>
      <LineAdvance
        shape="smooth"
        point
        area
        position="时间*数量"
      />
    </Chart>
  );
};

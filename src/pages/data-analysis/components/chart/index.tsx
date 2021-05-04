import React, { FC, useEffect, useState } from "react";
import { Chart, LineAdvance } from "bizcharts";
import { EnumChartType } from "../../../../types/data-ananysis";
import { Empty } from "antd";
interface DataChartProps {
  chartData: any[];
  type: EnumChartType;
}
const formitTime = (time)=>{
  return `${time
    .toString()
    .slice(0, 4)}-${time
    .toString()
    .slice(4, 6)}-${time.toString().slice(6, 8)}`;
}
export const DataChart: FC<DataChartProps> = ({ chartData, type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let addData = [];
    switch (type) {
      case EnumChartType.死亡人数:
        (chartData || []).forEach((item) => {
        
          addData.push({ time: formitTime(item.dateId), count: item.deadCount });
        });
        break;
      case EnumChartType.治愈人数:
        (chartData || []).forEach((item) => {          
          addData.push({ time: formitTime(item.dateId), count: item.curedCount });
        });
        break;
      case EnumChartType.确诊人数:
        (chartData || []).forEach((item) => {          
          addData.push({
            time: formitTime(item.dateId),
            count: item.currentConfirmedCount,
          });
        });
        break;
    }
    setData(addData);
  }, [chartData, type]);
  return (
    <Chart
      appendPadding={[30, 30, 30, 30]}
      autoFit
      height={500}
      data={data}
      scale={{
        count: { min: 0, alias: "总数", type: "linear-strict" },
      }}
      placeholder={<Empty />}
    >
      <LineAdvance sharp="smooth" area position="time*count" point />
    </Chart>
  );
};

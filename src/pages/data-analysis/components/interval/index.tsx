import React, { FC, useEffect, useState } from "react";
import { Chart, Tooltip, Interval } from "bizcharts";
import { formitTime } from "../chart";

interface DataIntervalprops {
  intervaData: any[];
}
export const DataInterval: FC<DataIntervalprops> = ({ intervaData }) => {
  useEffect(() => {
    let addData = [];
    if (intervaData) {
      intervaData.forEach((item) => {
        addData.push(
          {
            name: "治愈率",
            日期: formitTime(item.dateId),
            count: item.curedCount / item.confirmedCount,
          },
          {
            name: "死亡率",
            日期: formitTime(item.dateId),
            count: item.deadCount / item.confirmedCount,
          }
        );
      });
      setData(addData);
    }
  }, [intervaData]);
  const [data, setData] = useState([]);
  return (
    <Chart height={500} padding="auto" data={data} autoFit>
      <Interval
        adjust={[
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]}
        color="name"
        position="日期*count"
      />
      <Tooltip shared />
    </Chart>
  );
};

import { Input, DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getData } from "../../service/data-analysis";
import { EnumChartType } from "../../types/data-ananysis";
import { DataChart } from "./components/chart";
import { DataInterval } from "./components/interval";
import { ContentWrapper, FilterWRapper, PartContentWrapper } from "./styled";

const { RangePicker } = DatePicker;
const DataAnalysis = () => {
  const [countryName, setCountryName] = useState<string>("中国");
  const [chartData, setChartData] = useState([]);
  const [time, setTime] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(countryName);
      const data = res?.data;
      let filterData = [];
      if (data) {
        let startTime;
        let endTime;
        if (time.length >= 2) {
          startTime = time[0].replaceAll("-", "");
          endTime = time[1].replaceAll("-", "");
        } else {
          startTime = "20200101";
          endTime = dayjs().format("YYYYMMDD");
        }
        (data || []).forEach((item) => {
          //如果时间间隔在时间分为内添加
          if (item.dateId >= startTime && item.dateId <= endTime) {
            filterData.push(item);
          }
        });
        setChartData(filterData);
      }
    };
    fetchData();
  }, [countryName, time]);
  const handleChange = (e) => {
    if (e?.target?.value) {
      setCountryName(e?.target?.value);
    } else {
      setCountryName("中国");
    }
  };
  const handleTimeChange = (time, timeString) => {
    if (time) {
      setTime(timeString);
    } else {
      setTime([]);
    }
  };
  return (
    <ContentWrapper>
      <FilterWRapper>
        <Input placeholder="请输入国家名" allowClear onChange={handleChange} />
        <RangePicker
          placeholder={["开始时间", "结束时间"]}
          allowClear
          onChange={handleTimeChange}
        />
      </FilterWRapper>
      <div className="chart">
        <div className="top">
          <PartContentWrapper>
            <div className="title">{countryName}治愈人数总数趋势图</div>
            <DataChart chartData={chartData} type={EnumChartType.治愈人数} />
          </PartContentWrapper>
          <PartContentWrapper>
            <div className="title">{countryName}确诊人数总数趋势图</div>
            <DataChart chartData={chartData} type={EnumChartType.确诊人数} />
          </PartContentWrapper>
        </div>
        <div className="bottom">
          <PartContentWrapper>
            <div className="title">{countryName}死亡人数总数趋势图</div>
            <DataChart chartData={chartData} type={EnumChartType.死亡人数} />
          </PartContentWrapper>
          <PartContentWrapper>
            <div className="title">{countryName}</div>
            <DataInterval intervaData={chartData}/>
          </PartContentWrapper>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default DataAnalysis;

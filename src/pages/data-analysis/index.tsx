import { Input, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { getData } from "../../service/data-analysis";
import { EnumChartType } from "../../types/data-ananysis";
import { DataChart } from "./components/chart";
import { ContentWrapper, FilterWRapper, PartContentWrapper } from "./styled";

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
          if(time.length>2){
              const startTime = time[0].replace("-","");
              const endTime = time[1].replace("-","");
              (data||[]).forEach(item=>{
                  if(startTime<item.dateId<endTime){
                      filterData.push(item);
                  }
              })
          }else{
            filterData = data;
          }
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
  const handleTimeChange = (time, timeString)=>{
      setTime(timeString);
  }
  return (
    <ContentWrapper>
      <FilterWRapper>
        <Input
          placeholder="请输入国家名"
          allowClear
          onChange={handleChange}
        />
        <TimePicker.RangePicker
          placeholder={["开始时间", "结束时间"]}
          format="YYYY-MM-DD"
          allowClear
          onChange={handleTimeChange}
        />
      </FilterWRapper>
      <div className="chart">
        <PartContentWrapper>
          <div className="title">{countryName}治愈人数总数趋势图</div>
          <DataChart chartData={chartData} type={EnumChartType.治愈人数} />
        </PartContentWrapper>
        <PartContentWrapper>
          <div className="title">{countryName}确诊人数总数趋势图</div>
          <DataChart chartData={chartData} type={EnumChartType.确诊人数} />
        </PartContentWrapper>
        <PartContentWrapper>
          <div className="title">{countryName}死亡人数总数趋势图</div>
          <DataChart chartData={chartData} type={EnumChartType.死亡人数} />
        </PartContentWrapper>
      </div>
    </ContentWrapper>
  );
};

export default DataAnalysis;

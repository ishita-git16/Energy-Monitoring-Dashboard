// import "./styles.css";
import React, { useEffect, useState } from "react";
// import ReactFC from "react-fusioncharts";
// import FusionCharts from "fusioncharts";
// import Column2D from "fusioncharts/fusioncharts.charts";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,FunnelChart,Funnel,LabelList
} from "recharts";

// import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inphbndhcm5paGFyQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoxLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2MjgwNjEyNzR9.lCzUQ6Bj7xYE-4AdWkqD54t_UmE3CG21naO8ttdg72E";
const Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      headers: {
        "xc-auth": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heXVyaTZnYWlrd2FkQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoxLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2MjgxNTQ5OTN9.r9vN3S75FznYHnbMswZfq1TZEHz-byIkJ3MLF1iu0Aw`,
      },
      url: `http://localhost:8082/nc/cord__wOLj/api/v1/Energy1?limit=20 `,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
console.log(data);
  // const chartConfigs = {
  //   type: "column2d", // The chart type
  //   width: "700", // Width of the chart
  //   height: "400", // Height of the chart
  //   dataFormat: "json", // Data type
  //   dataSource: {
  //     // Chart Configuration
  //     chart: {
  //       //Set the chart caption
  //       caption: "Energy Consumptions by type",
  //       //Set the chart subcaption
  //       subCaption: "Data",
  //       //Set the x-axis name
  //       xAxisName: "type",
  //       //Set the y-axis name
  //       yAxisName: "kwh",
  //       numberSuffix: "K",
  //       //Set the theme for your chart
  //       theme: "fusion",
  //     },
  //     // Chart Data
  //     data: chartData,
      
  //   },
  // };
  //  console.log(chartData)

  // const data = [
  //   {
  //     id: 1,
  //     region: "Maharashtra",
  //     area: "Pune",
  //     siteid: "Satararoad01",
  //     meter: "1",
  //     type: "eb",
  //     kwh: "235",
  //     date: "2021-07-22"
  //   },
  //   {
  //     id: 2,
  //     region: "Maharashtra",
  //     area: "Pune",
  //     siteid: "Satararoad02",
  //     meter: "1",
  //     type: "dg",
  //     kwh: "25",
  //     date: "2021-08-03"
  //   },
  //   {
  //     id: 3,
  //     region: "Maharashtra",
  //     area: "Mumbai",
  //     siteid: "Ashar01",
  //     meter: "1",
  //     type: "eb",
  //     kwh: "325",
  //     date: "2021-08-01"
  //   },
  //   {
  //     id: 4,
  //     region: "Maharashtra",
  //     area: "Nashik",
  //     siteid: "nashik01",
  //     meter: "1",
  //     type: "dg",
  //     kwh: "56",
  //     date: "2021-08-02"
  //   }
  // ];
  return (
    <div className="App">
      {/* <ReactFC {...chartConfigs} /> */}
      <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Location" />
      <YAxis dataKey="Kwh"/>
      <Tooltip />
      <Legend />
      <Bar dataKey="Location" fill="#136e75" />
      <Bar dataKey="Kwh" fill="#82ca9d" />
    </BarChart>
    {/* <FunnelChart width={730} height={250} data={data}>
  <Tooltip />
  <Funnel
    dataKey="Location"
    data={data}
    isAnimationActive
  >
    <LabelList position="right" type="#000" stroke="none" dataKey="Kwh" />
  </Funnel>
</FunnelChart> */}
    </div>
  );
};
export default Charts;

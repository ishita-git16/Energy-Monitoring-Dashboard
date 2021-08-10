import React from 'react';
import Column2D from "fusioncharts/viz/column2d";
import fusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";
// add chart as dependency - FusionCharts.addDep(ChartType);
FusionCharts.addDep(Column2D);
FusionCharts.addDep(fusionTheme);

FusionCharts.addDep(Column2D);
FusionCharts.addDep(FusionTheme);

//STEP 2 - Chart Data
const chartData = [{
"label": "Venezuela",
"value": "290"
}, {
"label": "Saudi",
"value": "260"
}, {
"label": "Canada",
"value": "180"
}, {
"label": "Iran",
"value": "140"
}, {
"label": "Russia",
"value": "115"
}, {
"label": "UAE",
"value": "100"
}, {
"label": "US",
"value": "30"
}, {
"label": "China",
"value": "30"
}];

//STEP 3 - Chart Configurations
const chartConfig = {
type: 'column2d',
renderAt: 'chart-container',
width: '100%',
height: '400',
dataFormat: 'json',
dataSource: {
// Chart Configuration
"chart": {
"caption": "Countries With Most Oil Reserves [2017-18]",
"subCaption": "In MMbbl = One Million barrels",
"xAxisName": "Country",
"yAxisName": "Reserves (MMbbl)",
"numberSuffix": "K",
"theme": "fusion",
},
// Chart Data
"data": chartData
}
};

// STEP 4 - Create an Instance with chart options and render the chart
// var chartInstance = new FusionCharts(chartConfig);
// chartInstance.render();
export const Chart1 = () => {
    
    return (
      <chartConfig/>
    );
  };
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import moment from 'moment';



const value = [
    { date: '2021/01/11', count:2 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx, })),
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, })),
    { date: '2016/04/12', count:2 },
    { date: '2016/05/01', count:5 },
    { date: '2016/05/02', count:5 },
    { date: '2016/05/03', count:1 },
    { date: '2016/05/04', count:11 },
    { date: '2016/05/08', count:32 },
  ];

const HeatMapCalendar = () => {
    //const [data, setdata] = useState(value);
    const todate=moment().format('yyyy/MM/DD');
    console.log(todate);
  return (
    <div>
      <HeatMap value={value} startDate={todate} panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
        
      }}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip key={props.key} placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
      
      
      />
    </div>
  )
};
export default HeatMapCalendar;
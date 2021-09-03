import react, { useEffect, useState } from 'react';
import { XAxis, YAxis, Legend, BarChart, Bar,  Funnel, Tooltip, FunnelChart, LabelList } from 'recharts';
// import { Chart, Interval , Axis, Geom, Legend} from 'bizcharts';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import {CChart} from '@coreui/react-chartjs';
import { CDropdown } from '@coreui/react';
import { CDropdownItem} from '@coreui/react';
import { CDropdownDivider} from '@coreui/react';


// import './App.css';
function DataFetching() {
  const [posts, setPosts] = useState([])
  const [id, setId] = useState(1)

  useEffect(() => {
    axios({
      method: "GET",
      headers: {
        "xc-auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImYyMDE4MDM0OUBwaWxhbmkuYml0cy1waWxhbmkuYWMuaW4iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI4MDc5NDQ5fQ.9UqoowbVICFghJ9oRMEMZwp3uESA4lzSAOzlqrbBAS0/',
      },
      url: `http://localhost:8005/nc/distinctive_aardwolf_cmkT/api/v1/MeterQuery5/${id}`,
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

return (
    <div>
      <input type = "text" value={id} onChange = {e => setId(e.target.value)} ></input>
      <ul>
        {posts.map(posts => (
          <li key = {posts.id}> 
            {posts.Name}
          </li>
        ))}
      </ul>
    </div>
) 
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Funnel1 = () => {
  const data = [
    {
      "value": 100,
      "name": "Kerela",
      "fill": "#8884d8"
    },
    {
      "value": 80,
      "name": "Rajasthan",
      "fill": "#83a6ed"
    },
    {
      "value": 50,
      "name": "West Bengal",
      "fill": "#8dd1e1"
    },
    {
      "value": 40,
      "name": "Gujarat",
      "fill": "#82ca9d"
    },
    {
      "value": 26,
      "name": "Orissa",
      "fill": "#a4de6c"
    }
  ]

  return (
    <FunnelChart width={400} height={260}>
      <Tooltip />
      <Funnel
        dataKey="value"
        data={data}
        isAnimationActive
      >
        <LabelList position="right" fill="white" stroke="none" dataKey="name" />
      </Funnel>
    </FunnelChart>
  )
}



const Demo = () => {

  const [post, setPost] = react.useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      headers: {
        "xc-auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImYyMDE4MDM0OUBwaWxhbmkuYml0cy1waWxhbmkuYWMuaW4iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI4MDc5NDQ5fQ.9UqoowbVICFghJ9oRMEMZwp3uESA4lzSAOzlqrbBAS0',
      },
      url: `http://localhost:8005/nc/dexter_jettster_BOU6/api/v1/CustomData`,
    })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
  <BarChart width={400} height={350} data={post}>
    	<XAxis dataKey="Dt" />
	  	<YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Tkwh" fill="#8884d8" />
  </BarChart>
)
}

const Demo2 = () => {

  charts(FusionCharts);
  const dataSource = {
    chart: {
      caption: "Datewise Energy Consumption",
      yaxisname: "KwH",
      showvalues: "1",
      numberprefix: "$",
      theme: "fusion"
    },
    data: [

      {
        label: "2021-06-23T00:00:00.000Z",
        value: "114.449951171875"
      },
      {
        label: "2021-06-24T00:00:00.000Z",
        value: "669.31005859375"
      },

    ]
  };

  return (
    <ReactFusioncharts
    type="bar3d"
    width="70%"
    height="23%"
    dataFormat="JSON"
    dataSource={dataSource}
    />
)
}

const Demo3 = () => {

  const [post, setPost] = react.useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      headers: {
        "xc-auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImYyMDE4MDM0OUBwaWxhbmkuYml0cy1waWxhbmkuYWMuaW4iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI4MDc5NDQ5fQ.9UqoowbVICFghJ9oRMEMZwp3uESA4lzSAOzlqrbBAS0',
      },
      url: `http://localhost:8005/nc/distinctive_aardwolf_cmkT/api/v1/CustomData`,
    })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
  <BarChart width={400} height={250} data={post}>
    	<XAxis dataKey="State" />
	  	<YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Tkwh" fill="#8884d8" />
  </BarChart>
)
}
const Demo4 = () => {
const pie = {
  
  labels: [
    'Maharashtra',
    'MP',
    'Karnataka',
  ],
  datasets: [
    {
      data: [31834.704597890377,643.0971074104309,0.8099977970123291],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

return(
<div>
  {/* <CDropdown
    color="primary"
    toggler-text="Dropdown Button" 
    class="m-2"
  > */}
    {/* <CDropdownItem>First Action</CDropdownItem>
    <CDropdownItem>Second Action</CDropdownItem>
    <CDropdownItem>Third Action</CDropdownItem>
    <CDropdownDivider></CDropdownDivider>
    <CDropdownItem>Something else here...</CDropdownItem>
    <CDropdownItem disabled>Disabled action</CDropdownItem>
  </CDropdown> */}
 
    <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
    </div>
   
)
}







export {DataFetching, Demo, Demo2, Demo3, Demo4, Funnel1};


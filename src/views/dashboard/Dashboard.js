import React, { lazy, Suspense } from 'react'
import { CCol, CRow, CContainer } from '@coreui/react'
import Button from '../../Components/Button/Button';
import Calendar1 from '../../Components/Calendar/Calendar';
import HeatMapCalendar from '../../Components/Calendar/HeatMapCalendar';
import Charts from '../../Components/Charts/Charts';
import Map from '../../Components/Charts/map';
import { Cal, Funnel1, Demo, Demo2, Demo3, Demo4, DataFetching } from '../../Components/Charts/combined';
import Charts1 from '../../Components/Charts/charts1';
// import {Funnel1,Demo,useStyles} from './..Components/Charts/combined';
// import Map from './..';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';

<style>
  backgroundCOlor : "blue";
</style>


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // backgroundColor: "#1d345a",

  },
}));

const Daterange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
 
  <DateRangePicker
    onChange={item => setState([item.selection])}
    showSelectionPreview={true}
    moveRangeOnFirstSelection={false}
    months={2}
    ranges={state}
    direction="horizontal"
    
  />;
  
}


const Dashboard = ({ match }) => {
  const classes = useStyles();
  return (
    <>

      <CContainer fluid style = {{backgroundColor: "#1d345a"}}>
        {/* <main > */}
        <Suspense fallback={loading}>
          {/* <WidgetsDropdown /> */}
          {/* <Button></Button> */}
          {/* <Calendar1/> */}
          {/* <DataFetching /> */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}><Calendar/></Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}><Daterange/></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><Map /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><Funnel1 /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><Demo4 /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}> <Charts1 /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}> <Demo2 /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}> <Demo /></Paper>
            </Grid>
          </Grid>

          {/* <Charts />
          <div class="Charts"> <Charts1 /></div>

          <div class="Map"> <Map /></div> *
          <DataFetching />
          <Charts1 />
          <Funnel1 />
          <Demo />
          <Demo2 />
          <Demo3 />
          <Demo4 /> */}

          <CRow>
            <CCol>
            </CCol>
          </CRow>
        </Suspense>
        
      </CContainer>

    </>
  )
}
export default Dashboard

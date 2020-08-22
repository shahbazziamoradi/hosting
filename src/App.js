import React from 'react';
import { Routes, Private, Public } from './components/routing'
import { E404 } from './views/errors/404';
import { Account, Gates, Home, Places, Reports, Requests, Settings } from './views/views';


export default function App() {
  return (
    <Routes>
      <Private path="/" exact={true} component={Home.Index} />
      <Private path="/places" exact={true} component={Places.Index} />
      <Private path="/gates" exact={true} component={Gates.Index} />
      <Private path="/users" exact={true} component={Account.Users} />
      <Private path="/lists" exact={true} component={Gates.Lists} />
      <Private path="/traffic" exact={true} component={Gates.Traffic} />
      <Private path="/reports" exact={true} component={Reports.Index} />
      <Private path="/requests" exact={true} component={Requests.Index} />
      <Private path="/settings" exact={true} component={Settings.Index} />
      {/*<Private path="/setting" component={Setting} />
      <Private path="/places" component={Places} />
      <Private path="/devices" component={Devices} />
      <Private path="/accessLists" component={AccessLists} />
      <Private path="/trafficList" component={TrafficList} />
      <Private path="/requests" component={Visitors} />
      <Private path="/guests" component={Guests} />
      <Private path="/users" component={Users} />
      <Private path="/changePassword" component={ChangePassword} /> */}
      {/* <Private path="/visitors" component={Visitors} /> */}
      <Public path="/login" component={Account.Login} />
      {/* <Public path="/glyphicons" component={Glyphicons} /> */}
      <Public component={E404} />
    </Routes>
  );
}
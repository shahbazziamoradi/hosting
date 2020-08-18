import React from 'react';
import { Routes, Private, Public } from './components/routing'
import { Account, Home } from './views/views';


export default function App() {
  return (
    <Routes>
      <Private path="/" exact={true} component={Home.Index} />
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
      {/* <Public component={_404} /> */}
    </Routes>
  );
}
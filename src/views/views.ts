import { Login } from './accounts/login'
import { Users, PersonList } from './accounts/users'
import { Index as HomeIndex } from './home/index'
import { Index as PlaceIndex } from './places/index'
import { Index as GatesIndex } from './gates/index'
import { GateSettings } from './gates/partials/_gateSettings'
import { NewGate } from './gates/partials/_newGate'
import { Index as ListsIndex } from './list/index'
import { Traffic, TrafficList } from './gates/traffic'
import { Index as RequestsIndex } from './requests/index'
import { Index as ReportsIndex } from './reports/index'
import { Index as SettingsIndex } from './settings/index'

var Account = { Login, Users, PersonList }
var Home = { Index: HomeIndex }
var Places = { Index: PlaceIndex }
var Gates = { Index: GatesIndex, Traffic, TrafficList, GateSettings, NewGate }
var Lists = { Index: ListsIndex }
var Requests = { Index: RequestsIndex }
var Reports = { Index: ReportsIndex }
var Settings = { Index: SettingsIndex }
export { Account, Home, Places, Gates, Requests, Reports, Settings, Lists }
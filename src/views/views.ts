import { Login } from './accounts/login'
import { Users } from './accounts/users'
import { Index as HomeIndex } from './home/index'
import { Index as PlaceIndex } from './places/index'
import { Index as GatesIndex } from './gates/index'
import { Lists } from './gates/lists'
import { Traffic } from './gates/traffic'
import { Index as RequestsIndex } from './requests/index'
import { Index as ReportsIndex } from './reports/index'
import { Index as SettingsIndex } from './settings/index'

var Account = { Login, Users }
var Home = { Index: HomeIndex }
var Places = { Index: PlaceIndex }
var Gates = { Index: GatesIndex, Lists, Traffic }
var Requests = { Index: RequestsIndex }
var Reports = { Index: ReportsIndex }
var Settings = { Index: SettingsIndex }
export { Account, Home, Places, Gates, Requests, Reports, Settings }
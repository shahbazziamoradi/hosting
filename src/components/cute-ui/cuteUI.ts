import Button, { buttonTheme, buttonType } from './elements/button'
import { Input, inputType } from './elements/input'
import { Toast, toastType } from './elements/toast'
import { Popup } from './elements/popup'
import { Table as TableCompenent, TBody, Td, Th, THead, Tr } from './elements/table'

var TableComponentSet = { Tr, Td, Table: TableCompenent, THead, TBody, Th }
export { Input, inputType, Button, buttonTheme, buttonType, Toast, toastType, Popup, TableComponentSet as Table }
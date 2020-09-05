import Button from './elements/button'
import Item from './elements/item'
import { Input, DropDown } from './elements/input'
import { Toast } from './elements/toast'
import { Popup, Alert, Confirm } from './elements/popup'
import { Table as TableCompenent, TBody, Td, Th, THead, Tr } from './elements/table'
import * as Basic from './elements/basics'

var TableComponentSet = { Tr, Td, Table: TableCompenent, THead, TBody, Th }
export {
    Input,
    DropDown,
    Button,
    Item,
    Toast,
    Popup, Alert, Confirm,
    TableComponentSet as Table,
    Basic
}
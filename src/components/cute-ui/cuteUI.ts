import Button from './elements/button'
import Item from './elements/item'
import { Input } from './elements/input'
import { Toast } from './elements/toast'
import { Popup } from './elements/popup'
import { Table as TableCompenent, TBody, Td, Th, THead, Tr } from './elements/table'
import * as Basic from './elements/basics'

var TableComponentSet = { Tr, Td, Table: TableCompenent, THead, TBody, Th }
export {
    Input,
    Button,
    Item,
    Toast,
    Popup,
    TableComponentSet as Table,
    Basic
}
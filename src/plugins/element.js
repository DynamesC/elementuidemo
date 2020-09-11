import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Alert,
  Loading,
  Dialog,
  Select,
  Option,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Alert)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
//  挂载到vue原型上面
Vue.prototype.$message = Message

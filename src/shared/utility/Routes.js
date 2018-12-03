import Home from '../activities/Home/Index'
import { fetchAmiiboType, fetchAmiiboUniverse, fetchAmiiboElements } from './Api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    fetchAmiiboType: (path = '') => fetchAmiiboType(),
    fetchAmiiboUniverse: (path = '') => fetchAmiiboUniverse(),
    fetchAmiiboElements: (path = '') => fetchAmiiboElements()
  }
]

export default routes
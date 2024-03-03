import Users from "../../components/masters/Users";
import Role from "../../components/masters/Role";
import Branch from "../../components/masters/Branch";
import FormData from "../../components/masters/FormData";
 const DASHBOARD_SIDEBAR_LINKS = [
    
        {
            key:'user',
            path:'/',
            label:'Users',
            content:<Users/>
         }, 
         {
            key:'user',
            path:'/role',
            label:'Role',
            content:<Role/>
         },  
         {
            key:'user',
            path:'/branch',
            label:'Branch',
            content:<Branch/>
         },  
         
]

const DASHBOARD_SIDEBAR_LINKS2 = [
   {
     key: "form",
     path: "/formdata",
     label: "Data Entry",
     content: <FormData/>,
   },
   {
     key: "cce",
     path: "/cceform",
     label: "CCE Form",
     content: <FormData />,
   },
 ];
 export { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_LINKS2 };
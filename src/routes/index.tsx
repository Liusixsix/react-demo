import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import HomeLayout from '../layouts/HomeLayout'
const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const Home = lazy(() => import("../pages/Home"));
const Recommend = lazy(()=>import('../pages/recommend'))

export default  [
  {
    component: BlankLayout,
    routes: [
        {
          path:'/',
          component:HomeLayout,
          routes:[
            {
              path: "/",
              exact: true,
              render: () => <Redirect to={"/recommend"} />,
            },  
            {
              path: "/recommend",
              component: SuspenseComponent(Recommend),
            },   
          ]
        },
        // {
        //   path: "/home",
        //   component: SuspenseComponent(Home),
        // },
    ],
  },
];



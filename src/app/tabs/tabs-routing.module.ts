import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule)
          },
          {
            path: 'menu-details',
            loadChildren: () => import('../pages/menu-details/menu-details.module').then(m => m.MenuDetailsPageModule)
          }
        ]
      },
      {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'address-list',
        loadChildren: () => import('../pages/address-list/address-list.module').then(m => m.AddressListPageModule)
      },
      {
        path: 'address-form',
        loadChildren: () => import('../pages/address-form/address-form.module').then(m => m.AddressFormPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      {
        path: 'order-history',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/order-history/order-history.module').then(m => m.OrderHistoryPageModule),
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/order-history-details/order-history-details.module').then( m => m.OrderHistoryDetailsPageModule)
          }
        ],
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

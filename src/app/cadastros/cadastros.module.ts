import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { GridComponent } from '../components/grid/grid.component';
import { CompTitleComponent } from '../components/comp-title/comp-title.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { GroupsComponent } from './groups/groups.component';
import { InsertGroupsComponent } from './groups/insert-groups/insert-groups.component';
import { DeleteGroupsComponent } from './groups/delete-groups/delete-groups.component';
import { GroupsRoutingModule } from './groups/groups.routing';
import { UsersComponent } from './users/users.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserRoutingModule } from './users/user.routing';
import { BlockComponent } from './block/block.component';
import { InsertBlockComponent } from './block/insert-block/insert-block.component';
import { DeleteBlockComponent } from './block/delete-block/delete-block.component';
import { BlockRoutingModule } from './block/block.routing';
import { DeliveryComponent } from './delivery/delivery.component';
import { InsertDeliveryComponent } from './delivery/insert-delivery/insert-delivery.component';
import { DeleteDeliveryComponent } from './delivery/delete-delivery/delete-delivery.component';
import { AddressComponent } from './address/address.component';
import { InsertAddressComponent } from './address/insert-address/insert-address.component';
import { DeleteAddressComponent } from './address/delete-address/delete-address.component';
import { AddressRoutingModule } from './address/address.routing';
import { DeliveryRoutingModule } from './delivery/delivery.routing';
import { ProdutoRoutingModule } from './produto/produto.routing';
import { ProdutoComponent } from './produto/produto.component';
import { InsertProdutoComponent } from './produto/insert-produto/insert-produto.component';
import { DeleteProdutoComponent } from './produto/delete-produto/delete-produto.component';
@NgModule({
  declarations: [
    GridComponent,
    CompTitleComponent,
    GroupsComponent,
    InsertGroupsComponent,
    DeleteGroupsComponent,
    UsersComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    BlockComponent,
    InsertBlockComponent,
    DeleteBlockComponent,
    DeliveryComponent,
    InsertDeliveryComponent,
    DeleteDeliveryComponent,
    AddressComponent,
    InsertAddressComponent,
    DeleteAddressComponent,
    ProdutoComponent,
    InsertProdutoComponent,
    DeleteProdutoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GroupsRoutingModule,
    UserRoutingModule,
    BlockRoutingModule,
    AddressRoutingModule,
    DeliveryRoutingModule,
    ProdutoRoutingModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastrosModule { }

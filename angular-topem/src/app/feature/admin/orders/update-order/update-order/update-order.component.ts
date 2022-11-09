import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Item} from "../../../../../core/models/orders/item";
import {NgxSpinnerService} from "ngx-spinner";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../../../../core/models/orders/order";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  formOrder = this.formBuilder.group({
    order_number:['',[Validators.required]],
    order_value:['',[Validators.required]],
    order_iva:['',[Validators.required]],
    order_total:['',[Validators.required]],
    receiver: this.formBuilder.group({
      customer_name: ['',[Validators.required]],
      customer_dni: ['',[Validators.required]]
    }),
    transmitter: this.formBuilder.group({
      customer_name: ['',[Validators.required]],
      customer_dni: ['',[Validators.required]]
    }),
    items: this.formBuilder.array([],[Validators.required,Validators.minLength(1)])
  });

  formItem = this.getFormItem();

  itemsData:Item[] = []

  closeResult:string = '';

  eventCreateOrder:any = null;
  order:Order|null = null;
  constructor(

    private spinner:NgxSpinnerService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private router:Router,
    private activeRoute:ActivatedRoute,

    private orderService:OrdersService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activeRoute.params.subscribe((params:any)=>{
      const orderId = params['order_id'];
      this.orderService.getOrderService(orderId).subscribe((resp)=>{
        this.order = resp.data;
        this.initData();
        this.spinner.hide();
      });
    });
  }

  initData()
  {
    if(this.order){
      if(this.order.order_number)this.formOrder.controls['order_number'].setValue(this.order.order_number);
      if(this.order.order_value)this.formOrder.controls['order_value'].setValue(`${this.order.order_value}`);
      if(this.order.order_iva)this.formOrder.controls['order_iva'].setValue(`${this.order.order_iva}`);
      if(this.order.order_total)this.formOrder.controls['order_total'].setValue(`${this.order.order_total}`);
      if(this.order.items)
      {
        for( let item of this.order.items)
        {
          this.itemsForm.push(this.getFormItem(item));
          this.itemsData.push(item);
        }
      }
      if(this.order.customer_receiver){
        this.formOrder.controls['receiver'].controls['customer_dni'].setValue(this.order.customer_receiver.customer_dni);
        this.formOrder.controls['receiver'].controls['customer_name'].setValue(this.order.customer_receiver.customer_name);
      }
      if(this.order.customer_transmitter){
        this.formOrder.controls['transmitter'].controls['customer_dni'].setValue(this.order.customer_transmitter.customer_dni);
        this.formOrder.controls['transmitter'].controls['customer_name'].setValue(this.order.customer_transmitter.customer_name);
      }
    }


  }

  ngOnDestroy()
  {
    if(this.eventCreateOrder)this.eventCreateOrder.unsubscribe();
  }

  onSubmit()
  {
    if(this.order && this.order.id){
      this.spinner.show();
      let data:any =this.formOrder.value;
      this.eventCreateOrder = this.orderService.updateOrderService(this.order.id,data).subscribe((resp)=>{
        this.spinner.hide();
        this.formOrder.reset();
        this.router.navigate(['/admin','orders'])
      })
    }
  }

  changeOrderItem()
  {
    let price:number|null|undefined = Number(this.formItem.get('item_price')?.value);
    let amount:number|null|undefined =  Number(this.formItem.get('item_amount')?.value);
    if(price && amount)this.formItem.controls['item_total'].setValue( price * amount );
  }

  getFormItem(data:Item|null = null)
  {
    return this.formBuilder.group({
      id:[(data && data.id) ? data.id : '',[Validators.required]],
      item_description:[(data) ? data.item_description : '',[Validators.required]],
      item_price:[(data) ? data.item_price : '',[Validators.required,Validators.min(0)]],
      item_amount:[(data) ? data.item_amount : '',[Validators.required,Validators.min(1)]],
      item_total:[(data) ? data.item_total : '',[Validators.required,Validators.min(0)]]
    })
  }

  removeItem(index:number){
    if(this.formOrder.controls['items'].controls.length > 0){
      this.formOrder.controls['items'].removeAt(index);
      this.itemsData = this.itemsData.filter((item,key) => key != index);
      this.changeModel();
    }
  }

  onSubmitItem()
  {
    let itemValue:any = this.formItem.value;
    this.modalService.dismissAll();
    this.formItem.reset();
    this.itemsForm.push(this.getFormItem(itemValue));
    this.itemsData.push(itemValue);
    this.changeModel();
  }

  changeModel()
  {
    let formOrderValue:any = this.formOrder.value;
    let orderValue:any = 0;
    for (let i of this.itemsData) orderValue = orderValue + i.item_total;
    if(orderValue){
      formOrderValue.order_value = orderValue;
      if(formOrderValue.order_iva){
        formOrderValue.order_total = ((orderValue * formOrderValue.order_iva)/100) + orderValue;
      }
    }
    this.formOrder.controls['order_value'].setValue(formOrderValue.order_value);
    this.formOrder.controls['order_total'].setValue(formOrderValue.order_total);
  }

  open(content:any) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get itemsForm() {
    return this.formOrder.get('items') as FormArray;
  }
}

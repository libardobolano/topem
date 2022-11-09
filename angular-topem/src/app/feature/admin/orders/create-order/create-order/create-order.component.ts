import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {Item} from "../../../../../core/models/orders/item";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrdersService} from "../../services/orders.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  formOrder = this.formBuilder.group({
    order_number:[null],
    order_value:[null,[Validators.required]],
    order_iva:[null,[Validators.required]],
    order_total:[null,[Validators.required]],
    receiver: this.formBuilder.group({
      customer_name: [null,[Validators.required]],
      customer_dni: [null,[Validators.required]]
    }),
    transmitter: this.formBuilder.group({
      customer_name: [null,[Validators.required]],
      customer_dni: [null,[Validators.required]]
    }),
    items: this.formBuilder.array([],[Validators.required,Validators.minLength(1)])
  });

  formItem = this.getFormItem();

  itemsData:Item[] = []

  closeResult:string = '';

  eventCreateOrder:any = null;
  constructor(

    private spinner:NgxSpinnerService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private router:Router,

    private orderService:OrdersService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy()
  {
    if(this.eventCreateOrder)this.eventCreateOrder.unsubscribe();
  }

  onSubmit()
  {
    this.spinner.show();
    let data:any =this.formOrder.value;
    this.eventCreateOrder = this.orderService.createOrderService(data).subscribe((resp)=>{
      this.spinner.hide();
      this.formOrder.reset();
      this.router.navigate(['/admin','orders'])
    })
  }

  changeOrderItem()
  {
    let price:number|null|undefined = this.formItem.get('item_price')?.value;
    let amount:number|null|undefined = this.formItem.get('item_amount')?.value;
    if(price && amount)this.formItem.controls['item_total'].setValue( price * amount );
  }

  getFormItem(data:Item|null = null)
  {
    return this.formBuilder.group({
      item_description:[(data) ? data.item_description : null,[Validators.required]],
      item_price:[(data) ? data.item_price : null,[Validators.required,Validators.min(0)]],
      item_amount:[(data) ? data.item_amount : null,[Validators.required,Validators.min(1)]],
      item_total:[(data) ? data.item_total : null,[Validators.required,Validators.min(0)]]
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

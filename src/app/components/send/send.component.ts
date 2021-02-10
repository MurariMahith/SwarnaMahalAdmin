import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Messages } from 'src/app/models/Messages';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';

@Component({
  selector: 'prfx-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService) { }

  messages = new Messages();

  ngOnInit() {
    this.service.getMessagesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(o => {
      this.messages = o[0];     
      console.log(this.messages)
    })
  }

  onSubmit()
  {
    console.log(this.messages)
    this.messages.key = '';
    this.service.deleteAllMessages();
    console.log("deleted all messages")
    this.service.createMessage(this.messages)
    window.location.href = '/send';
  }

}

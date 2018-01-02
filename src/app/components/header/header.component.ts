import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '@modules/socket/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public socketUrl = 'http://localhost:8080';

  constructor(public socketIoService: SocketIoService) {
  }

  ngOnInit() {
  }

  connect() {
    this.socketIoService.connect(this.socketUrl).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  disconnect() {
    this.socketIoService.disconnect();
  }
}

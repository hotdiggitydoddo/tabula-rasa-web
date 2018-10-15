import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private connection: signalR.HubConnection;

  public currentCount = 0;
  public text: string;
  
  constructor() { 
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/game")
      .build();

    this.connection.start().catch(err => document.write(err));
    this.connection.on("receiveMessage", (message: string) => {
      this.currentCount = Number.parseInt(message);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.connection.stop();
  }
}

import { Component, Input } from '@angular/core';
import { StatusPedidoLogResponse } from '../../../services/store.service';

@Component({
  selector: 'app-track-order-timeline',
  imports: [],
  templateUrl: './track-order-timeline.component.html',
  styleUrl: './track-order-timeline.component.css'
})
export class TrackOrderTimelineComponent {

  @Input() statusPedidoLog: StatusPedidoLogResponse[]  = [];

}

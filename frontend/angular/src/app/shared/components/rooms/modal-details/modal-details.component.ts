import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/rooms/modal.service';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal-details',
  standalone: true,
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css'],
  imports: [CommonModule],
})
export class ModalDetailsComponent implements OnInit {
  display: 'open' | 'close' = 'close';
  room: Room | null = null;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.watch().subscribe(display => {
      this.display = display;
    });
    
    this.modalService.getData().subscribe(data => {
      this.room = data;
    });
  }

  closeModal(): void {
    this.modalService.close();
  }
}
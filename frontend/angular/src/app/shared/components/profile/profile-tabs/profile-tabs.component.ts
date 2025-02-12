import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.css']
})
export class ProfileTabsComponent {
  @Input() activeTab?: string = 'profile';
  @Output() tabChange = new EventEmitter<string>();

  changeTab(activeTab: string) {
    this.tabChange.emit(activeTab);
  }
}
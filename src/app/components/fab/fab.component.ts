import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { buttonFab, buttonFabConfig } from "../../config/config";

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {
  public buttonFabs: buttonFab[] | undefined;
  public isFABVisible: boolean = false;

  @Output() toggleFABEmiter: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.buttonFabs = buttonFabConfig;
  }

  toggleFAB() {
    this.isFABVisible = !this.isFABVisible;
    this.toggleFABEmiter.emit();
  }
}

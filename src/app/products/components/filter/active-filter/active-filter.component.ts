import {Component, OnInit} from '@angular/core';
import {FilterCommunicationService} from "../../../services/filter-communication.service";
import {ParamOption} from "../../../models/ParamOption";

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrls: ['./active-filter.component.scss']
})
export class ActiveFilterComponent implements OnInit {

  activeParamsOfFilters: ParamOption[] = [];

  constructor(private filterService: FilterCommunicationService) {
  }

  ngOnInit(): void {
    this.filterService.getParamsOfFiltersActivated.subscribe((params: ParamOption[]) => {
      this.activeParamsOfFilters = params;
    });
  }

  deactivateFilter(param: ParamOption): void {
    this.filterService.deactivateFilterByParam(param);
  }
}

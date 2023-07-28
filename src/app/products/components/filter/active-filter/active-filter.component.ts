import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {QueryParam} from "../../../models/QueryParam";

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrls: ['./active-filter.component.scss']
})
export class ActiveFilterComponent implements OnInit {

  activeParamsOfFilters: QueryParam[] = [];

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.filterService.getParamsOfFiltersActivated.subscribe((params: QueryParam[]) => {
      this.activeParamsOfFilters = params;
    });
  }

  deactivateFilter(param: QueryParam): void {
    this.filterService.deactivateFilterByParam(param);
  }
}

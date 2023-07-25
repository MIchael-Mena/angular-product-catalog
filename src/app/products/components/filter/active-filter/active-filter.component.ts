import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {Filter} from "../../../models/Filter";
import {QueryParam} from "../../../models/QueryParam";

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrls: ['./active-filter.component.scss']
})
export class ActiveFilterComponent implements OnInit {

  // @Input() activeFilters: string[] = ['Filtro 1', 'Filtro 2', 'Filtro 3']
  @Input() activeFilters: QueryParam[] = [];
  @Output() onDeactivateFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    /*    this.filterService.filtersActivated.subscribe((paramFilters: QueryParam[]) => {
          this.activeFilters = paramFilters
        });*/
  }

  deactivateFilter(param: QueryParam) {
    const index = this.activeFilters.indexOf(param);
    this.activeFilters.splice(index, 1);
    // this.onDeactivateFilter.emit(param.name);
    console.log('deactivateFilter');
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrls: ['./active-filter.component.scss']
})
export class ActiveFilterComponent implements OnInit {

  filters: string[] = ['Filtro 1', 'Filtro 2', 'Filtro 3']

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params);
    });
  }

  deactivateFilter(filter: string) {
    const index = this.filters.indexOf(filter);
    this.filters.splice(index, 1);

    console.log('deactivateFilter');
  }
}

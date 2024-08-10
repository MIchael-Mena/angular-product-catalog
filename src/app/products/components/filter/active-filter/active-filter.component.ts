import {Component, OnInit} from '@angular/core';
import {ParamOption} from "../../../models/ParamOption";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrls: ['./active-filter.component.scss']
})
// Debe escuchar los cambios de la url y actualizar los filtros activos
export class ActiveFilterComponent implements OnInit {

  activeParamsOfFilters: ParamOption[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeParamsOfFilters = this.getActiveParamsOfFilters(params);
    });
  }


  private getActiveParamsOfFilters(params: Params) {
    const activeParams: ParamOption[] = [];
    Object.keys(params).forEach((paramName: string) => {
      const paramValue = params[paramName];
      const paramOption: ParamOption = {name: paramName, value: paramValue};
      activeParams.push(paramOption);
    });
    return activeParams;
  }

  deactivateFilter(param: ParamOption): void {
    const queryParams = {...this.route.snapshot.queryParams};
    delete queryParams[param.name];
    this.router.navigate([], {queryParams}).then();
  }

}

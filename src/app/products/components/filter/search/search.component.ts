import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../models/IProduct";
import {ActivatedRoute, Router} from "@angular/router";
import {unFormatToTextWithUnderscores} from "../../../../shared/functions/stringUtils";
import {ParamOption} from "../../../models/ParamOption";
import {Filter} from "../../../models/Filter";
import {FilterCommunicationService} from "../../../services/filter-communication.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements Filter, OnInit {

  public search: string = '';
  public countResults: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private filterService: FilterCommunicationService) {
    this.filterService.registerFilter(this);
  }

  ngOnInit(): void {
    this.subscribeToParamSearchChanges();
  }

  private subscribeToParamSearchChanges() {
    this.route.queryParams.subscribe((params) => {
      this.setParam(params['search']);
    });
  }

  public setParam(search: string): void {
    if (search) {
      this.updateSearch(search);
    } else {
      this.clearFilter();
    }
  }

  public updateSearch(search: string): void {
    this.search = unFormatToTextWithUnderscores(search);
    this.filterService.emitFilterChange(this);
  }

  public applyFilter(product: IProduct): boolean {
    return (
      product.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
      product.subcategoria!.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  public clearFilter(): void {
    this.search = '';
    this.filterService.emitFilterChange(this)
  }

  get paramOption(): ParamOption {
    return {
      name: 'search',
      paramType: 'queryParam',
      value: this.search
    };
  }

  public isActivated(): boolean {
    return this.search !== '';
  }

}

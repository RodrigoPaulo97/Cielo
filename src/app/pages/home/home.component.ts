import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration } from 'chart.js';
import { Item } from 'src/app/interface/main.interface';
import { TableColumn } from 'src/app/interface/table.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: Item[] = []
  columns: TableColumn[] = [
    { field: 'id', label: 'ID', width: 90 },
    // { field: 'merchantId', label: 'Merchant' },
    { field: 'paymentNode', label: ' Payment' },
    { field: 'cnpjRoot', label: 'CNPJ' },
    { field: 'date', label: 'DATE', type: 'date', filterDate: true },
    { field: 'paymentType', label: 'Payment Type' },
    { field: 'cardBrand', label: 'Card Brand' },
    { field: 'authorizationCode', label: 'Auth Code' },
    { field: 'truncatedCardNumber', label: 'Truncated Card Number' },
    { field: 'netAmount', label: 'Net Amount', type: 'currency' },
    { field: 'terminal', label: 'Terminal' },
    { field: 'administrationFee', label: 'Administration' },
    { field: 'channelCode', label: 'Channel Code' },
    { field: 'channel', label: 'Channel' },
    // { field: 'withdrawAmount', label: 'Withdraw Amount' },
    // { field: 'minimumMDRAmmount', label: 'Minimum MDR Ammount' },
    // { field: 'mdrTaxAmount', label: 'MDR Tax Amount' },
    // { field: 'mdrFeeAmount', label: 'MDR Fee Amount' },
    { field: 'status', label: 'Status' },
  ]


  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.service.get().subscribe(data => {
      this.dataSource = data.items
      console.log(data.items)
    })
  }

  get dataChart_total() {
    let data: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [
        {
          label: '-',
          data: [0],
          backgroundColor: [
            '#cc0d0d',
            '#088db0',
          ],
          hoverBackgroundColor: [
            '#cc0d0d',
            '#088db0',
          ],
        }
      ],

    }
    /// Get name card
    new Set(this.dataSource.map(item => item.cardBrand)).forEach(label => {
      data.labels?.push(label)
    })

    /// Get value cards
    const getValues = data.labels?.map(label => {
      const currencyTotal = this.dataSource.filter(item => item.cardBrand == label).map(item => item.netAmount).reduce((total, value) => total += value)
      return currencyTotal
    })

    data.datasets[0].data = getValues ?? []

    return data
  }
  
  get dataChart_flag() {
    let data: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [
        {
          label: '-',
          data: [0],
          backgroundColor: [
            '#cc0d0d',
            '#088db0',
          ],
          hoverBackgroundColor: [
            '#cc0d0d',
            '#088db0',
          ],  
        }
      ],

    }
    /// Get name card
    new Set(this.dataSource.map(item => item.cardBrand)).forEach(label => {
      data.labels?.push(label)
    })

    /// Get cont flags
    const getValues = data.labels?.map(label => {
      const currencyTotal = this.dataSource.filter(item => item.cardBrand == label).length
      return currencyTotal
    })

    data.datasets[0].data = getValues ?? []

    return data
  }

  get listChart() {
    return [{
      title: 'Total de vendas',
      data: this.dataChart_total
    }, {
      title: 'Total de bandeiras',
      data: this.dataChart_flag
    }]

  }


}

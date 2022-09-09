export interface TableColumn {
    label: string,
    field: string
    type?: 'date' | 'currency'
    width?: number,
    filterDate?: boolean
}
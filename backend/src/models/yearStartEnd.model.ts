export interface IYearStartEnd {
  yearStart: number | null
  yearEnd: number | null
}

export interface IYearsRegions extends IYearStartEnd {
  regions: string[]
}

export type FormType = 'add' | 'edit'

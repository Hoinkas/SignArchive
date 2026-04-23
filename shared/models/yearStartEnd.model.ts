export interface IYearStartEnd {
  yearStart: number | null | undefined
  yearEnd: number | null | undefined
}

export interface IYearsRegions extends IYearStartEnd {
  regions: string[]
}

export type FormType = 'add' | 'edit'

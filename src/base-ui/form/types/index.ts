interface ISelectOption {
  label: string
  value: any
}

type ItemType = 'input' | 'password' | 'select' | 'datepicker' | 'textarea'

export interface IFormItem {
  field: string
  type: ItemType
  label: string
  placeHolder?: string
  rules?: any[]
  options?: ISelectOption[]
  otherOption?: any
  defaultValue?: any
  isHidden?: boolean
  prop?: string
}

export interface IForm {
  title?: string
  formItems?: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
  prop?: string
}

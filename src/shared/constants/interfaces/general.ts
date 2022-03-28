export interface IFormItemOptions {
  heading: string
  description: string
}

export interface IFormItem {
  sequence: number
  id: string
  category: string
  illustrationSrc: string
  header: string
  subheader: string
  options?: IFormItemOptions[]
}

export interface IMemberJoinFormCopy {
  memberJoinForm: {
    quizList: IFormItem[]
  }
}

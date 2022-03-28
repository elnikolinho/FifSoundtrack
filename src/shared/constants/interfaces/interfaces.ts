/* ---------------------------------
  Address
--------------------------------- */
export interface IAddress {
  addressLine1: string
  addressLine2?: string
  suburb: string
  state: string
  postCode: string
  countryCode: string
  deliveryPointIdentifier?: number
  addressStatus?: string
}

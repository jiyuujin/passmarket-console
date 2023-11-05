/**
 * for app
 */

export type Color = 'white' | 'vue.blue' | 'vue.green'

export type Role = 'sponsor' | 'attendee' | 'attendee (online)'

export type Ticket = 'オフラインチケット' | 'スポンサーチケット' | 'オンライン参加表明'

// addition.csv data
export type AdditionItem = {
  receiptId: string
  role: Role
  fullName: string
  email: string
  survey1: string
  survey2: string
  survey3: string
  survey4: string
  survey5: string
  survey6: string
}

// list.xls colums
export type ListRow = {
  __EMPTY: string // "チケットID"
  __EMPTY_1: string // "参加者名"
  __EMPTY_10: string // "受付状況"
  __EMPTY_11: string // "受付日"
  __EMPTY_12: string // "受付時刻"
  __EMPTY_2: string // "チケット名"
  __EMPTY_3: string // "申込日"
  __EMPTY_4: string // "申込時刻"
  __EMPTY_5: string // "座席番号"
  __EMPTY_6: string // "外部コード"
  __EMPTY_7: string // "割引コード"
  __EMPTY_8: string // "価格"
  __EMPTY_9: string // "注文番号"
}

// list.xls data
export type ListMember = {
  ticketId: string
  ticketName: string
  userName: string
  applyDate: string
  orderId: string
}

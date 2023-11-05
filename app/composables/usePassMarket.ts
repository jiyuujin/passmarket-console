import { AdditionItem, ListMember, Role } from '~/types/app'
import { useUserRole } from '~/composables/useUserRole'

export function usePassMarket() {
  const { getRole } = useUserRole()

  function getReceipts(memberData: ListMember[]) {
    const receiptIds: { role: Role; receipt_id: string; name: string }[] = []

    for (const member of memberData) {
      receiptIds.push({
        role: getRole(member.ticketName),
        receipt_id: member.orderId,
        name: member.userName,
      })
    }

    return receiptIds
  }

  function getSurveys(surveyData: AdditionItem[]) {
    const surveys: {
      receipt_id: string
      role: Role
      full_name: string
      email: string
      survey1: string
      survey2: string
      survey3: string
      survey4: string
      survey5: string
      survey6: string
    }[] = []

    for (const survey of surveyData) {
      surveys.push({
        receipt_id: survey.receiptId,
        role: survey.role,
        full_name: survey.fullName,
        email: survey.email,
        survey1: survey.survey1,
        survey2: survey.survey2,
        survey3: survey.survey3,
        survey4: survey.survey4,
        survey5: survey.survey5,
        survey6: survey.survey6,
      })
    }

    return surveys
  }

  return { getReceipts, getSurveys }
}

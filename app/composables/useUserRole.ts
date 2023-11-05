import { match } from 'ts-pattern'
import { Role, Ticket } from '~/types/app'

export function useUserRole() {
  function getRole(target: Ticket) {
    return match<Ticket, Role>(target)
      .with('オフラインチケット', () => 'attendee')
      .with('スポンサーチケット', () => 'sponsor')
      .with('オンライン参加表明', () => 'attendee (online)')
      .exhaustive()
  }

  return { getRole }
}

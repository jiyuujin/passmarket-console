import { Database } from '~/types/supabase'
import { Role } from '~/types/app'
import { useToast } from './useToast'

export function useSupabase() {
  const client = useSupabaseClient<Database>()
  const { onError, onSuccess } = useToast()

  async function updateEventSurvey(
    eventSurveys: {
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
    }[],
  ) {
    const { error } = await client
      .from('event_surveys')
      .upsert(eventSurveys, { onConflict: 'receipt_id' })
      .select()
    if (error) {
      onError('アンケート情報を取り込めませんでした', 3000)
      return
    }

    onSuccess('アンケート情報を取り込みました', 3000)
  }

  return { updateEventSurvey }
}

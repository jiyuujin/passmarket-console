import { Database } from '~/types/supabase'

export async function useUser() {
  const client = useSupabaseClient<Database>()
  const { data: eventSurvey } = await useAsyncData('event_surveys', async () => {
    return await client.from('event_surveys').select()
  })
  const { data, error } = eventSurvey.value as any

  return { eventSurvey: data, error }
}

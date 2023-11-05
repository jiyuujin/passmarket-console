<script setup lang="ts">
import RoundButton from '~/components/button/RoundButton.vue'
import { usePassMarket } from '~/composables/usePassMarket'
import { usePassMarketUpload } from '~/composables/usePassMarketUpload'
import { useSupabase } from '~/composables/useSupabase'
import { useArray } from '~/composables/useArray'
import { AdditionItem, Role } from '~/types/app'

const surveys = ref<AdditionItem[]>([])
const surveyResults = ref<
  {
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
  }[]
>([])

const { getSurveys } = usePassMarket()
const { fetchSurveys } = usePassMarketUpload()
const { updateEventSurvey } = useSupabase()
const { eventSurvey } = await useUser()
const { unique } = useArray()

const columns = [
  'receipt_id',
  'role',
  'full_name',
  'email',
  'survey1',
  'survey2',
  'survey3',
  'survey4',
  'survey5',
  'survey6',
]

enum FileName {
  // 参加者一覧
  // LIST_XLS = 'list.xls',
  // 購入者アンケート情報
  ADDITION_CSV = 'addition.csv',
}

const checkFiles = async (files: File[]) => {
  if (files.length === 0) return

  const file = files[0]
  const filename = file.name

  if (filename === FileName.ADDITION_CSV) {
    surveys.value = await fetchSurveys(file)
    const _surveyResults = getSurveys(surveys.value)
    surveyResults.value = unique<{
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
    }>(_surveyResults, 'receipt_id')
  }
  alert(`this file is not acceptable -> ${filename}`)
}

const onUpdate = () => {
  if (surveyResults.value?.length === 0) return

  updateEventSurvey(surveyResults.value)
}
</script>

<template>
  <main>
    <div class="resultarea">
      <DragDropArea
        file-name="passmarketdata"
        file-accept="application/vnd.ms-excel,application/zip,text/csv"
        @check-files="checkFiles"
      >
        <p>
          <b>Upload one of them</b><br />
          <!--
          list.xls
          <br />
          -->
          addition.csv
        </p>
      </DragDropArea>
      <div class="update-button">
        <RoundButton @click="onUpdate">アンケート情報の取込</RoundButton>
      </div>
    </div>
    <div class="listarea">
      <ul class="table">
        <li v-for="(survey, index) in eventSurvey" :key="index">
          <ul class="table-item">
            <li v-for="column in columns" :key="column">
              {{ survey[column] }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="ts" scoped>
css({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  '.resultarea': {
    width: '100%',
    height: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '16px',
  },
  '.listarea': {
    width: '100%',
    height: 'auto',
  },
  '.table': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowX: 'scroll',
  },
  '.table-item': {
    display: 'flex',
    gap: '16px',
    '::v-deep(li)': {
      width: '10%',
      whiteSpace: 'pre-wrap',
    },
  },
  '.update-button': {
    display: 'grid',
    placeItems: 'center',
    width: '300px',
  },
})
</style>

<template>
  <k-modal @close="$emit('close')">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <p>Versions ({{ versions.length }})</p>
      <ul>
        <li
          v-for="version in versions"
          :key="version.id"
        >
          v{{ version.name }} {{ version.description }}
        </li>
      </ul>
    </div>
  </k-modal>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KModal from './KModal.vue'

import type { Service, Version } from '@/types'

export default defineComponent({
  name: 'ServiceDetailModal',
  components: {
    KModal,
  },
  props: {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    versions: {
      type: Array as PropType<Version[]>,
      required: true,
    },
    type: {
      type: String as PropType<Service['type']>,
      required: true,
      validator: (value: string) => ['REST', 'HTTP'].includes(value),
    },
  },
  emits: ['close'],
})
</script>

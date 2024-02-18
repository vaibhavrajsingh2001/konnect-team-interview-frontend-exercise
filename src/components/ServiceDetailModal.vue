<template>
  <k-modal @close="$emit('close')">
    <div class="service-detail-modal">
      <p class="modal-title">
        {{ title }}
      </p>
      <p class="modal-description">
        {{ description }}
      </p>
      <p class="versions">
        Versions ({{ versions.length }})
      </p>
      <ul class="version-list">
        <service-version-card
          v-for="version in versions"
          :key="version.id"
          :description="version.description"
          :developer="version.developer"
          :name="version.name"
          :type="type"
          :updated-at="version.updated_at"
        />
      </ul>
    </div>
  </k-modal>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KModal from '@/components/KModal.vue'
import ServiceVersionCard from '@/components/ServiceVersionCard.vue'

import type { Service, Version } from '@/types'

export default defineComponent({
  name: 'ServiceDetailModal',
  components: {
    KModal,
    ServiceVersionCard,
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

<style lang="scss">
.service-detail-modal {
  p {
    margin: 0;
  }

  .modal-title {
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .modal-description {
    color: #707888;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 2rem;
    margin-bottom: 1.4rem;
  }

  .versions {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 24px;
  }

  .version-list {
    list-style: none;
    padding: 0;

    &>li:not(:first-child) {
      border-top: 1px solid #F1F1F5;
    }
  }
}
</style>

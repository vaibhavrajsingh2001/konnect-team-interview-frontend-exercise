<template>
  <li class="version-card">
    <div class="version-details">
      <span class="version-name">v{{ name }}</span>
      <span
        class="version-description"
        :title="description"
      >
        {{ description }}
      </span>
      <span
        class="service-type"
        :class="type === 'HTTP' ? 'http-bg-color' : 'rest-bg-color'"
      >{{ type }}</span>
    </div>
    <span
      v-if="developer"
      class="developer-details"
    >
      <k-avatar
        :avatar-url="developer.avatar"
        :email="developer.email"
        :name="developer.name"
      />
      <div>
        <p class="developer-name">{{ developer.name }}</p>
        <p class="service-updated-at">{{ fromNow(updatedAt) }}</p>
      </div>
    </span>
  </li>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KAvatar from '@/components/KAvatar.vue'

import { fromNow } from '@/util'
import type { Developer, Service } from '@/types'

export default defineComponent({
  name: 'ServiceVersionCard',
  components: {
    KAvatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    developer: {
      type: Object as PropType<Developer>,
      default: null,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<Service['type']>,
      required: true,
      validator: (value: string) => ['REST', 'HTTP'].includes(value),
    },
  },
  methods: { fromNow },
})
</script>
<style lang="scss">
.version-card {
  align-items: center;
  display: flex;
  gap: 20rem;
  justify-content: space-between;
  padding: 0.8rem 0;
}

.version-details {
  align-items: center;
  display: flex;
  gap: 3.2rem;

  .version-name {
    color: #262626;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 2.4rem;
    width: 4rem;
  }

  .version-description {
    -webkit-box-orient: vertical;
    color: #8A8A8A;
    display: -webkit-box;
    font-size: 1.2rem;
    -webkit-line-clamp: 2;
    line-height: 1.6rem;
    overflow: hidden;
    width: 25rem;
  }
}

.service-type {
  border-radius: 0.4rem;
  color: #1155CB;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 0.5rem;

  &.rest-bg-color {
    background-color: #BDD3F9;
  }

  &.http-bg-color {
    background-color: #F8F8FA;
  }
}

.developer-details {
  align-items: start;
  display: flex;
  gap: 0.6rem;
  justify-content: start;
  text-align: left;

  .k-avatar {
    height: 2rem;
    width: 2rem;
  }

  .developer-name {
    color: #3C4557;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 2.4rem;
  }

  .service-updated-at {
    color: #8A8A8A;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
  }
}
</style>

import type { ObjectDirective, DirectiveBinding } from 'vue'

const debounceDirective: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const fn = binding.value
    const delay = typeof binding.arg === 'number' ? binding.arg : 400

    if (!fn || typeof fn !== 'function') {
      console.warn('v-debounce expects a function as the value')
      return
    }

    let timeoutID: ReturnType<typeof setTimeout>

    el.oninput = (event: Event) => {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        const target = event.target as HTMLInputElement
        fn(target.value, event)
      }, delay)
    }
  },
  unmounted(el: HTMLElement) {
    el.oninput = null
  },
}

export default debounceDirective

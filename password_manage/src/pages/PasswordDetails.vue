<template>
  <div class="mx-20 my-4" v-if="!password.get.loading">
    <div class="flex flex-row items-center justify-between">
      <h1 class="font-black text-5xl text-gray-900">
        {{ password.doc.title }}
      </h1>
      <div class="flex flex-row items-center space-x-1">
        <Button icon-left="arrow-left" @click="router.back()">Go back</Button>
        <Button
          appearance="white"
          class="text-red-400 border-red-400"
          icon-left="trash"
          @click="password.delete()"
          >Delete</Button
        >
        <!-- <Button
          appearance="white"
          class="text-green-600 border-green-600"
          icon-left="save"
          @click="password.update.submit({})"
          >Save</Button
        > -->
      </div>
    </div>
  </div>
  <LoadingIndicator v-else class="w-6 text-blue-500" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createDocumentResource, LoadingIndicator } from 'frappe-ui'
import { reactive, ref,computed } from 'vue'

const router = useRouter()
const props = defineProps(['name'])
const password = createDocumentResource({
  doctype: 'Password Manager',
  name: props.name,
  onSuccess(data) {
    console.log(data)
    // router.push({ name: data.name })
  },
})
const delete_password = createDocumentResource({
  doctype: 'Password Manager',
  name: props.name,
  delete:{
    onSuccess() {},
  }
})
</script>

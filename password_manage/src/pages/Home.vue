<template>
  <div class="mx-20">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-5xl font-black text-gray-900">Lists</h2>
      <Button icon-left="plus">New List</Button>
    </div>
    <div class="mt-2">
      <Card title="AWS">
        <div>
          <ul>
            <li
              class="flex flex-row space-y-2 items-center justify-between"
              v-for="pm in password_manager.data"
              :key="pm.name"
            >
            <router-link :to="`/password/${pm.name}`">
              {{ pm.name }}
            </router-link>
            </li>
          </ul>
          <Button @click="addPasswordDialogShow = true" icon-left="plus"
            >Add Password</Button
          >
        </div>
      </Card>
    </div>
    <Dialog
      :options="{
        title: 'Add New Password',
        actions:[
          {
            label: 'Add Password',
            appearance: 'primary',
            handler: ({ close }) => {
              addPassword()
              close()
            },
          },
          {label:'Cancel'},
        ]
      }"
      v-model="addPasswordDialogShow"
    >
    <template #body-content>
      <div class="space-y-2">
        <Input v-model='password.title' label="Title" type="text" required placeholder="title" />
        <Input v-model='password.category' label="Category" type="select" :options="categoryOptions" />
        <Input v-model='password.url' label="URL" type="text" required placeholder="url" />
        <Input v-model='password.username' label="Username" type="text" required placeholder="username" />
        <Input v-model='password.password' label="Password" type="password" required placeholder="password" />
      </div>
    </template>
    </Dialog>
  </div>
</template>

<script setup>
import { Dialog, createListResource, Card, Input } from 'frappe-ui'
import { reactive, ref,computed } from 'vue'

const password = reactive({
  title: '',
  category: '',
  url: '',
  username: '',
  password: '',
})

const addPasswordDialogShow = ref(false)

const password_manager = createListResource({
  doctype: 'Password Manager',
  fields: ['name', 'category', 'url', 'username', 'password'],
})

password_manager.reload()

const category = createListResource({
  doctype: 'PM Category',
  fields: ['name','category_name'],
  transform(category){
    return category.map((c) => ({label: c.category_name, value: c.name}))
  },
  cache:'password_manager',
})

category.reload()

const categoryOptions=computed(() =>{
  if(category.list.loading || !category.data){
    return []
  }
  return category.data
})

const addPassword = () => {
  password_manager.insert.submit(password)
}
</script>

import VueRouter from 'vue-router'
import { fireEvent, render, screen } from '@testing-library/vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Component from '@/App.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: "/about",
      // component: About, <-- Succeeds
      component: () => import("@/views/About.vue"), // <-- Fails
    }
  ]
})

describe('HelloWorld.vue', () => {
  it('Should navigate to /about, a dynamic route, when the link is clicked', async () => {
    render(Component, {}, vue => {
      vue.use(VueRouter)
      return { router }
    })
    const route = screen.getByTestId('route')
    expect(route.textContent).toBe('/')
    const link = screen.getByText('About')
    await fireEvent.click(link)
    expect(route.textContent).toBe('/about')
  })
})

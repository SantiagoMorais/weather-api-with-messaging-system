import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/pokemons/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/pokemons/"!</div>
}

import { Provider } from 'react-redux'
import { Playground, store } from 'graphql-playground-react'

export default function GqlPlayground() {
    return <Provider store={store}>
        <Playground endpoint="/api/graphql"  />
    </Provider>
}
import { InMemoryCache } from '@apollo/client'
//import {onError} from 'apollo-link-error'
//import {Observable} from 'apollo-link'
//import {setContext} from 'apollo-link-context'
import constants from 'ROOT/services/constants'
import { ApolloClient, HttpLink } from '@apollo/client'

/*
const refreshTokenLink = onError(  ({ graphQLErrors, networkError, operation, forward }) => {

    if (graphQLErrors && graphQLErrors[0]) {
        
        if (graphQLErrors[0].message === 'Token expired') {
            return new Observable(observer => {
                fetch(constants.GRAPHQL_URL, {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({query: '{ operatorRefreshToken { access_token } }'}),
                }).then(refreshResponse => {
                    return refreshResponse.json()
                }).then(json => {
                    
                    localStorage.setItem(constants.AUTH_TOKEN, json.data.operatorRefreshToken.access_token)
                    operation.setContext(({ headers = {} }) => ({
                        headers: {
                            // Re-add old headers
                            ...headers,
                            // Switch out old access token for new one
                            authorization: `Bearer ${json.data.operatorRefreshToken.access_token}` || null,
                        }
                    }))
                }).then(() => {
                    const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    }
                    
                    // Retry last failed request
                    forward(operation).subscribe(subscriber)
                })
                    .catch(error => {
                        
                        // No refresh or client token available, we force user to login
                        localStorage.clear()
                        client.clearStore()
                        window.location = '/'
                        observer.error(error)
                    })
            })
        }
    }

    if  (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})
*/
const httpLink = new HttpLink({
    uri: constants.GRAPHQL_URL,
    credentials: 'include',
})

/*
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(constants.AUTH_TOKEN)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            //authorization: token ? `Bearer ${token}` : '',
        }
    }
})
*/

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null,
})
const client = new ApolloClient({
    cache,
    resolvers: {},
    //Use it if you want localstorage token bearer solution
    //link: authLink.concat(refreshTokenLink).concat(httpLink),
    link: httpLink,
})

const data = {
    showLeftMenu: false,
    isLoggedIn: false,
}

cache.restore({ data })

client.onResetStore(() => {
    cache.restore({ data })
})


export default client
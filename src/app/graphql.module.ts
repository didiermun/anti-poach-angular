
 // <-- add the URL of the GraphQL server here


import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {  Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
const uri = 'https://anti-poaching.herokuapp.com/graphql';

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log(token);
  const auth = setContext((operation, context) => ({
    headers: {
      auth_token: `Bearer ${token}`
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}


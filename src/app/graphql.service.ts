import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from '@apollo/client/core';
import ApolloClient from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    // apollo.create({
    //   link : httpLink.create({ uri: 'https://insights.opentok.com/graphql' }),
    //   cache: new InMemoryCache()
    // })
  }
}

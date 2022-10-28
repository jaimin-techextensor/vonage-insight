import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphqlService } from './graphql.service';
import * as JWT from 'jsonwebtoken';
import { setContext } from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from '@apollo/client/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vonage-insight';
  private query: any;

  constructor(private graphqlService: GraphqlService, private apollo: Apollo) {

  }

  ngOnInit(): void {


    debugger
    // this.graphqlService.getInsights();
    var now = Math.round(new Date().getTime() / 1000);
    var later = now + 120;
    const payload = {
      iss: 47489751,
      ist: "project",
      iat: now,
      exp: later
    };

    const getHeaders = () => {
      const token = JWT.sign(payload, 'c73db71f8f86c5ac5c41540cc771c2d60c249943');
      const headers = {
        "X-OPENTOK-AUTH": token
      };
      return headers;
    };


    const authLink = setContext((_, { headers }) => {
      const authHeaders = getHeaders();
      // return the headers to the context so httpLink can read them
      return {
        headers: authHeaders
      };
    });

    const httpLink: any = createHttpLink({
      uri: "https://insights.opentok.com/graphql",
      fetch: fetch
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });


    this.query = this.apollo.watchQuery({
      query: gql`
      query ($PROJECT_ID: Int!, $START_TIME: Date!) {
        project(projectId: 47489751) {
          projectData(
          start: 2022-04-24T07:00:00.000Z,
          interval: AUTO,
          sdkType: [JS, IOS, ANDROID],
          groupBy: [SDK_TYPE]
              ) {
            resources {
              sdkType
              intervalStart
              intervalEnd
              usage {
                streamedPublishedMinutes
                streamedSubscribedMinutes
              }
            }
          }
        }
    }`
    });

    this.query.valueChanges.subscribe((result: any) => {
      debugger
      const data = result.data;
    });
  }
}


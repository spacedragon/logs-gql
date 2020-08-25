export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Date: any;
};



export enum Env {
  Prod = 'PROD',
  Test = 'TEST'
}

export type CustomDimension = {
  __typename?: 'CustomDimension';
  AppVersion?: Maybe<Scalars['String']>;
  ClientType?: Maybe<Scalars['String']>;
  ClientVersion?: Maybe<Scalars['String']>;
  ComponentName?: Maybe<Scalars['String']>;
  CorrelationId?: Maybe<Scalars['String']>;
  EventId?: Maybe<Scalars['String']>;
  EventTime?: Maybe<Scalars['String']>;
  Extension?: Maybe<Scalars['String']>;
  Flight?: Maybe<Array<Maybe<Scalars['String']>>>;
  Language?: Maybe<Scalars['String']>;
  Path?: Maybe<Scalars['String']>;
  PivotName?: Maybe<Scalars['String']>;
  Region?: Maybe<Scalars['String']>;
  RegionalFormat?: Maybe<Scalars['String']>;
  ResourceGroup?: Maybe<Scalars['String']>;
  Route?: Maybe<Scalars['String']>;
  RunId?: Maybe<Scalars['String']>;
  SelectedPivotKey?: Maybe<Scalars['String']>;
  SessionId?: Maybe<Scalars['String']>;
  Subscription?: Maybe<Scalars['String']>;
  SubscriptionId?: Maybe<Scalars['String']>;
  TelemetryEventVersion?: Maybe<Scalars['String']>;
  Theme?: Maybe<Scalars['String']>;
  View?: Maybe<Scalars['String']>;
  WorkspaceId?: Maybe<Scalars['String']>;
  WorkspaceLocation?: Maybe<Scalars['String']>;
  WorkspaceName?: Maybe<Scalars['String']>;
  WorkspaceRegion?: Maybe<Scalars['String']>;
  isMicrosoftEmployee?: Maybe<Scalars['Boolean']>;
};

export type CustomEvent = {
  __typename?: 'CustomEvent';
  timestamp: Scalars['String'];
  operationId: Scalars['ID'];
  operationParentId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  itemType?: Maybe<Scalars['String']>;
  customDimensions?: Maybe<CustomDimension>;
  operationName?: Maybe<Scalars['String']>;
  operationSyntheticSource?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['String']>;
  userAuthenticatedId?: Maybe<Scalars['String']>;
  userAccountId?: Maybe<Scalars['String']>;
  applicationVersion?: Maybe<Scalars['String']>;
  clientType?: Maybe<Scalars['String']>;
  clientModel?: Maybe<Scalars['String']>;
  clientOS?: Maybe<Scalars['String']>;
  clientIP?: Maybe<Scalars['String']>;
  clientCity?: Maybe<Scalars['String']>;
  clientStateOrProvince?: Maybe<Scalars['String']>;
  clientCountryOrRegion?: Maybe<Scalars['String']>;
  clientBrowser?: Maybe<Scalars['String']>;
  cloudRoleName?: Maybe<Scalars['String']>;
  cloudRoleInstance?: Maybe<Scalars['String']>;
  appId?: Maybe<Scalars['String']>;
  appName?: Maybe<Scalars['String']>;
  iKey?: Maybe<Scalars['String']>;
  sdkVersion?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  itemCount?: Maybe<Scalars['Int']>;
  dependencies?: Maybe<Array<Maybe<Dependency>>>;
};


export type CustomEventDependenciesArgs = {
  success?: Maybe<Scalars['Boolean']>;
};

export type QueryInput = {
  /** custom query string before limit */
  filter?: Maybe<Scalars['String']>;
  /** limit result size */
  limit?: Maybe<Scalars['Int']>;
  /** time range */
  timespan?: Maybe<Scalars['String']>;
};

export type DependencyCustomDimension = {
  __typename?: 'DependencyCustomDimension';
  ApiPath: Scalars['String'];
  AppVersion?: Maybe<Scalars['String']>;
  ClientVersion?: Maybe<Scalars['String']>;
  ComponentName?: Maybe<Scalars['String']>;
  Extension?: Maybe<Scalars['String']>;
  Flight?: Maybe<Array<Maybe<Scalars['String']>>>;
  HttpMethod?: Maybe<Scalars['String']>;
  Language?: Maybe<Scalars['String']>;
  Path?: Maybe<Scalars['String']>;
  Region?: Maybe<Scalars['String']>;
  RegionalFormat?: Maybe<Scalars['String']>;
  ResourceGroup?: Maybe<Scalars['String']>;
  Route?: Maybe<Scalars['String']>;
  SearchParams?: Maybe<Scalars['String']>;
  Subscription?: Maybe<Scalars['String']>;
  SubscriptionId?: Maybe<Scalars['String']>;
  Theme?: Maybe<Scalars['String']>;
  View?: Maybe<Scalars['String']>;
  WorkspaceId?: Maybe<Scalars['String']>;
  WorkspaceLocation?: Maybe<Scalars['String']>;
  WorkspaceName?: Maybe<Scalars['String']>;
  WorkspaceRegion?: Maybe<Scalars['String']>;
  correlation?: Maybe<Scalars['String']>;
  errorCodes?: Maybe<Scalars['String']>;
  isAborted?: Maybe<Scalars['Boolean']>;
  isMicrosoftEmployee?: Maybe<Scalars['Boolean']>;
  responseHeaders?: Maybe<Scalars['JSON']>;
  requestId?: Maybe<Scalars['String']>;
  request?: Maybe<SmtLog>;
};

export type Dependency = {
  __typename?: 'Dependency';
  timestamp: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  itemType?: Maybe<Scalars['String']>;
  customDimensions?: Maybe<DependencyCustomDimension>;
  operationId: Scalars['ID'];
  operationName?: Maybe<Scalars['String']>;
  operationParentId?: Maybe<Scalars['ID']>;
  sessionId?: Maybe<Scalars['String']>;
  useId?: Maybe<Scalars['String']>;
  clientType?: Maybe<Scalars['String']>;
  clientModel?: Maybe<Scalars['String']>;
  clientOS?: Maybe<Scalars['String']>;
  clientIP?: Maybe<Scalars['String']>;
  clientCity?: Maybe<Scalars['String']>;
  clientStateOrProvince?: Maybe<Scalars['String']>;
  clientCountryOrRegion?: Maybe<Scalars['String']>;
  clientBrowser?: Maybe<Scalars['String']>;
  appId?: Maybe<Scalars['String']>;
  appName?: Maybe<Scalars['String']>;
  iKey?: Maybe<Scalars['String']>;
  sdkVersion?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  itemCount?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['JSON']>;
  path?: Maybe<Array<Maybe<Scalars['String']>>>;
  api?: Maybe<Scalars['String']>;
  apiPath?: Maybe<Scalars['String']>;
  apiPath2?: Maybe<Scalars['String']>;
};

export type CustomEvents = {
  __typename?: 'CustomEvents';
  byScenario?: Maybe<Array<Maybe<CustomEvent>>>;
  byQuery?: Maybe<Array<Maybe<CustomEvent>>>;
};


export type CustomEventsByScenarioArgs = {
  scenario?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  query?: Maybe<QueryInput>;
};


export type CustomEventsByQueryArgs = {
  query?: Maybe<QueryInput>;
};

export type Dependencies = {
  __typename?: 'Dependencies';
  newDependencies?: Maybe<Array<Maybe<Dependency>>>;
  byQuery?: Maybe<Array<Maybe<Dependency>>>;
};


export type DependenciesNewDependenciesArgs = {
  query?: Maybe<QueryInput>;
};


export type DependenciesByQueryArgs = {
  query?: Maybe<QueryInput>;
};

export type UserErrors = {
  __typename?: 'UserErrors';
  byQuery?: Maybe<Array<Maybe<CustomEvent>>>;
  byExtension?: Maybe<Array<Maybe<CustomEvent>>>;
};


export type UserErrorsByQueryArgs = {
  query?: Maybe<QueryInput>;
};


export type UserErrorsByExtensionArgs = {
  extensions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SmtLog = {
  __typename?: 'SmtLog';
  Table?: Maybe<Scalars['String']>;
  stream?: Maybe<Scalars['String']>;
  docker?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  Timestamp?: Maybe<Scalars['String']>;
  SourceClassName?: Maybe<Scalars['String']>;
  LogLevel_long?: Maybe<Scalars['Float']>;
  LogLevel_string?: Maybe<Scalars['String']>;
  Scopes?: Maybe<Scalars['String']>;
  ApiName?: Maybe<Scalars['String']>;
  ActivityId?: Maybe<Scalars['String']>;
  ApiInvocationTime?: Maybe<Scalars['String']>;
  Arguments?: Maybe<Scalars['String']>;
  ArgumentsDecoded?: Maybe<Scalars['JSON']>;
  ApiType?: Maybe<Scalars['String']>;
  Details?: Maybe<Scalars['String']>;
  DetailsDecoded?: Maybe<Scalars['JSON']>;
  DurationMs?: Maybe<Scalars['Float']>;
  EndTime?: Maybe<Scalars['String']>;
  ErrorCode?: Maybe<Scalars['String']>;
  ErrorSubCodes?: Maybe<Scalars['String']>;
  HbiWorkspace_string?: Maybe<Scalars['String']>;
  HbiWorkspace_bool?: Maybe<Scalars['Boolean']>;
  HttpStatusCode?: Maybe<Scalars['Float']>;
  Stats?: Maybe<Scalars['String']>;
  RequestId?: Maybe<Scalars['String']>;
  RequestorId?: Maybe<Scalars['String']>;
  RequestIp?: Maybe<Scalars['String']>;
  RequestorType?: Maybe<Scalars['String']>;
  RequestUrl?: Maybe<Scalars['String']>;
  ResourceGroup?: Maybe<Scalars['String']>;
  RetryTimes?: Maybe<Scalars['Float']>;
  StartTime?: Maybe<Scalars['String']>;
  SubscriptionId?: Maybe<Scalars['String']>;
  TenantId?: Maybe<Scalars['String']>;
  UserAgent?: Maybe<Scalars['String']>;
  WorkspaceId?: Maybe<Scalars['String']>;
  WorkspaceName?: Maybe<Scalars['String']>;
  WorkspaceRegion?: Maybe<Scalars['String']>;
  Referer?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  Node?: Maybe<Scalars['String']>;
  EnvNamespace?: Maybe<Scalars['String']>;
  Pod?: Maybe<Scalars['String']>;
  Container?: Maybe<Scalars['String']>;
  FluentdIngestTimestamp?: Maybe<Scalars['Date']>;
  Tenant?: Maybe<Scalars['String']>;
  Role?: Maybe<Scalars['String']>;
  RoleInstance?: Maybe<Scalars['String']>;
  Environment?: Maybe<Scalars['String']>;
  PreciseTimeStamp?: Maybe<Scalars['Date']>;
  SourceNamespace?: Maybe<Scalars['String']>;
  SourceMoniker?: Maybe<Scalars['String']>;
  SourceVersion?: Maybe<Scalars['String']>;
  TaskName?: Maybe<Scalars['String']>;
  ClientType?: Maybe<Scalars['String']>;
  ConflictingProperties?: Maybe<Scalars['String']>;
  Exception?: Maybe<Scalars['String']>;
};


export type SmtLogDetailsDecodedArgs = {
  showRaw?: Maybe<Scalars['Boolean']>;
};

export type SmtLogs = {
  __typename?: 'SmtLogs';
  allLogs?: Maybe<Array<Maybe<SmtLog>>>;
  byRequestId?: Maybe<Array<Maybe<SmtLog>>>;
};


export type SmtLogsAllLogsArgs = {
  query?: Maybe<QueryInput>;
};


export type SmtLogsByRequestIdArgs = {
  requestId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  customEvents?: Maybe<CustomEvents>;
  dependencies?: Maybe<Dependencies>;
  userErrors?: Maybe<UserErrors>;
  smtLogs?: Maybe<SmtLogs>;
};


export type QueryCustomEventsArgs = {
  env?: Maybe<Env>;
};


export type QueryDependenciesArgs = {
  env?: Maybe<Env>;
};


export type QueryUserErrorsArgs = {
  env?: Maybe<Env>;
};


export type QuerySmtLogsArgs = {
  env?: Maybe<Env>;
};

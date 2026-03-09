export type Bindings = CloudflareBindings & {
  PUBLIC_URL?: string;
  DASHBOARD_URL?: string;
};

export type Variables = {
  user?: any;
  session?: any;
};

export type Bindings = CloudflareBindings & {
  PUBLIC_URL?: string;
};

export type Variables = {
  user?: any;
  session?: any;
};

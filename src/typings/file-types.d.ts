declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.json' {
  const records: Record<string, string>;
  export default records;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

declare module '*.gif' {
  const url: string;
  export default url;
}

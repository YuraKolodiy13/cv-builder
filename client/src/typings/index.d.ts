declare module 'react-to-pdf';

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
    > & { title?: string }>;

  const src: string;
  export default src;
}

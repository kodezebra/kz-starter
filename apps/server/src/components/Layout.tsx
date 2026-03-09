import { BlockRenderer } from "./BlockRenderer";

interface LayoutProps {
  title?: string;
  children?: any;
  headerBlock?: any;
  footerBlock?: any;
}

export const Layout = (props: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
        <title>{props.title || "FSK CMS"}</title>
        <link rel="stylesheet" href="/style.css" />
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body>
        {props.headerBlock && (
          <header>
            <BlockRenderer blocks={[props.headerBlock]} />
          </header>
        )}
        {props.children}
        {props.footerBlock && (
          <footer>
            <BlockRenderer blocks={[props.footerBlock]} />
          </footer>
        )}
        <script dangerouslySetInnerHTML={{ __html: `
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        `}} />
      </body>
    </html>
  );
};

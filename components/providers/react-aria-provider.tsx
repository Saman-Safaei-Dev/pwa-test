"use client";

import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

type Props = {
  children: React.ReactNode;
};

/**
 * `ReactAriaProvider` component provides the client side routing ability for
 * react aria Link components.
 */
function ReactAriaProvider(props: Props) {
  const { children } = props;
  const router = useRouter();
  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}

export default ReactAriaProvider;

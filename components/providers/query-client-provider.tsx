"use client";

import createQueryClient from "@/lib/query";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
};

function QueryClientProvider(props: Props) {
  const { children } = props;
  const [queryClient] = useState(createQueryClient);

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}

export default QueryClientProvider;
